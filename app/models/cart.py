from .db import db, environment, SCHEMA, add_prefix_for_prod

in_cart = db.Table(
    "in_cart",
    db.Model.metadata,
    db.Column("carts", db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), primary_key=True),
    db.Column("games", db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), primary_key=True)
)

if environment == "production":
    in_cart.schema = SCHEMA


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    total = db.Column(db.Float, nullable=False, default=0)

    items = db.relationship('Game', secondary=in_cart)
    owner = db.relationship('User', back_populates='cart')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'items': [item.to_cart_dict() for item in self.items]
        }



# class Discount(db.Model):
#     __tablename__ = 'discounts'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     discount_percent = db.Column(db.Float, nullable=False)
