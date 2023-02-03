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

if environment == "production":
    game_genres.schema = SCHEMA
    system_availability.schema = SCHEMA

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

    games = db.relationship('Game',  back_populates='systems', secondary=system_availability)

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

    game = db.relationship('Game', back_populates='media',foreign_keys=[game_id])

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'is_preview': self.is_preview
        }


class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    developer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    release_date = db.Column(db.Date, nullable=False) # default=datetime.now().strftime("%m/%d/Y")
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    about = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Enum('E', 'T', 'M', name='esrb_ratings', create_type=False), nullable=False)
    # discount_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("discounts.id")), nullable=True)

    developer = db.relationship('User', back_populates='games_developed',foreign_keys=[developer_id])
    genres = db.relationship('Genre', back_populates='games', secondary=game_genres)
    systems = db.relationship('System', back_populates='games', secondary=system_availability)
    media = db.relationship('GameImage', back_populates='game', cascade='all, delete')

    @property
    def formatted_release_date(self):
        return self.release_date.strftime("%b %d, %Y")

    # @release_date.setter
    # def release_date(self, date):
    #     print(date)
    #     self._release_date = date.strftime("%m/%d/%Y")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'developer_id': self.developer_id,
            'release_date': self.formatted_release_date,
            'price': self.price,
            'description': self.description,
            'about': self.about,
            'rating': self.rating,
            'media': [media.to_dict() for media in self.media],
        }

    def to_cart_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'preview': [media.url for media in self.media if media.is_preview == True][0],
            'systems': [system.name for system in self.systems]
        }
