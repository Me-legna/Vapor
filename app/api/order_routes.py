from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Game, Order, User, db
from app.forms import GameForm
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)


@order_routes.route('/')
@login_required
def get_orders():
    """
    Get orders of current user
    """
    orders = Order.query.filter(Order.user_id==current_user.id).all()
    orders_list = [order.to_dict() for order in orders]

    return jsonify({"Orders": orders_list})


@order_routes.route('/', methods=['PUT'])
@login_required
def remove_from_cart():
    """
    refund item from an order of current user
    """
    item_id = request.json['item_id']

    game = Game.query.get(item_id)
    cart = Cart.query.filter(Cart.user_id==current_user.id).one()

    if game in cart.items:
        cart.items.remove(game)
        cart.total -= game.price
        db.session.commit()

    return jsonify(cart.to_dict())


@order_routes.route('/', methods=['DELETE'])
@login_required
def reset_cart():
    """
    checks if checking out to send to orders and
    empties all items from and reset price of cart of current user
    """
    checkout = request.json['checkout']

    # game = Game.query.get(item_id)
    cart = Cart.query.filter(Cart.user_id==current_user.id).one()

    if checkout:
        new_order =  Order(
        customer=current_user,
        order_detail=cart.items,
        type='Purchase',
        total=cart.total
        )
        current_user.games_owned.extend(cart.items)
        db.session.add(new_order)
        db.session.commit()
    cart.items = []
    cart.total = 0
    db.session.commit()
    return jsonify(cart.to_dict())