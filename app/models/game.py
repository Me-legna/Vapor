from .db import db, environment, SCHEMA, add_prefix_for_prod


game_genres = db.Table(
    "game_genres",
    db.Model.metadata,
    db.Column("games", db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), primary_key=True),
    db.Column("genres", db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), primary_key=True)
)

system_availability = db.Table(
    "system_availability",
    db.Model.metadata,
    db.Column("games", db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), primary_key=True),
    db.Column("systems", db.Integer, db.ForeignKey(add_prefix_for_prod('systems.id')), primary_key=True)
)


class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    games = db.relationship('Game', back_populates='genres', secondary=game_genres, cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'games': [game.to_dict() for game in self.games]
        }


class System(db.Model):
    __tablename__ = 'systems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    games = db.relationship('Game', back_populates='systems', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'games': [game.to_dict() for game in self.games]
        }


class GameImage(db.Model):
    __tablename__ = 'game_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("games.id")), nullable=False)
    url = db.Column(db.String, nullable=False)
    is_preview = db.Column(db.Boolean, default=False)

    game = db.relationship('Game', back_populates='media')

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'url': self.url,
            'is_preview': self.is_preview
        }


class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    developer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    _release_date = db.Column(db.Date, nullable=False) # default=datetime.now().strftime("%m/%d/Y")
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Enum('E', 'T', 'M'), nullable=False)

    developer = db.relationship('User', back_populates='games_developed')
    genres = db.relationship('Genre', back_populates='games', secondary=game_genres)
    systems = db.relationship('System', back_populates='games', secondary=system_availability)
    media = db.relationship('GameImage', back_populates='game')

    @property
    def release_date(self):
        return self._release_date("%m/%d/%Y")

    @release_date.setter
    def release_date(self, date):
        self._release_date = date.strftime("%m/%d/%Y")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'developer_id': self.developer_id,
            '_release_date': self._release_date,
            'price': self.price,
            'description': self.description,
            'rating': self.rating,
            'media': [media.to_dict() for media in self.media],
        }
