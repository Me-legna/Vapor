from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


library = db.Table(
    "library",
    db.Model.metadata,
    db.Column("games", db.Integer, db.ForeignKey(
        add_prefix_for_prod('games.id')), primary_key=True),
    db.Column("users", db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    library.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    developer_alias = db.Column(db.String(40), nullable=True, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    games_owned = db.relationship('Game', secondary=library, cascade='all, delete')
    games_developed = db.relationship('Game', back_populates='developer')
    cart = db.relationship('Cart', uselist=False, back_populates='owner')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'developer_alias': self.developer_alias,
            'email': self.email,
            'games_owned': [game.to_dict() for game in self.games_owned],
            'games_developed': [game.to_dict() for game in self.games_developed],
            'cart': self.cart.to_dict()
        }

    def dev_to_dict(self):
        return {
            'id': self.id,
            'developer_alias': self.developer_alias,
            'games_developed': [game.to_dict() for game in self.games_developed]
        }
