from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date


# order_items = db.Table(
#     "order_items",
#     db.Model.metadata,
#     db.Column("order_id", db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True),
#     db.Column("game_id", db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), primary_key=True),
#     db.Column("is_refunded", db.Boolean, default=False)
# )

# if environment == "production":
#     order_items.schema = SCHEMA


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    type = db.Column(db.Enum('Purchase', 'Gift Purchase', 'In-Game Purchase', name='purchase_type', create_type=False), nullable=False)
    purchase_date = db.Column(db.Date, nullable=False, default=date.today())
    total = db.Column(db.Float, nullable=False)

    customer = db.relationship('User', back_populates='purchases')
    order_detail = db.relationship('OrderItem')

    @property
    def formatted_purchase_date(self):
        return self.purchase_date.strftime("%b %d, %Y")

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'purchaseDate': self.formatted_purchase_date,
            'total': self.total,
            'customerId': self.customer_id,
            'items': [item.to_dict() for item in self.order_detail]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("games.id")), primary_key=True)
    is_refunded = db.Column(db.Boolean, default=False)
    refund_date = db.Column(db.Date, default=None)
    amount = db.Column(db.Float, nullable=False)

    game = db.relationship('Game')

    @property
    def formatted_refund_date(self):
        if self.refund_date == None:
            return None
        else:
            return self.refund_date.strftime("%b %d, %Y")

    def to_dict(self):
        return {
            # "order_id": self.order_id,
            # "game_id": self.game_id,
            "game": self.game.to_order_dict(),
            "is_refunded": self.is_refunded,
            "refund_date": self.formatted_refund_date,
            "amount": self.amount
        }
