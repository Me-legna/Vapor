from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


order_items = db.Table(
    "order_items",
    db.Model.metadata,
    db.Column("orders", db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True),
    db.Column("games", db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), primary_key=True)
)

if environment == "production":
    order_items.schema = SCHEMA


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    type = db.Column(db.Enum('Purchase', 'Gift Purchase', 'In-Game Purchase', name='purchase_type', create_type=False), nullable=False)
    purchase_date = db.Column(db.DateTime, nullable=False, default=datetime.now())
    total = db.Column(db.Float, nullable=False)

    customer = db.relationship('User', back_populates='purchases')
    order_detail = db.relationship('Game', secondary=order_items)

    def to_dict(self):
        return {
            'type': self.type,
            'purchase_date': self.purchase_date,
            'total': self.total,
            'customer': self.customer.to_dict(),
            'items': [item.title for item in self.order_detail]
        }
