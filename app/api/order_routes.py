from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Game, Order, User, db, order_items
from app.forms import GameForm
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)


@order_routes.route('/')
@login_required
def get_orders():
    """
    GET orders of current user
    """
    orders = Order.query.filter(Order.user_id==current_user.id).all()
    orders_list = [order.to_dict() for order in orders]

    return jsonify({"Orders": orders_list})


@order_routes.route('/<int:order_id>')
@login_required
def get_single_order(order_id):
    """
    GET single order of current user
    """

    order = Order.query.get(order_id)


    return jsonify(order.to_dict())


@order_routes.route('/<int:order_id>/refund', methods=['PUT'])
@login_required
def refund_item(order_id):
    """
    refund item from an order of current user
    """

    item_id = request.json['itemId']
    order = Order.query.get(order_id)
    orditems = db.metadata.tables['order_items']
    # items = (
    #     orditems.update()
    #     .where(orditems.columns.orders == order_id and orditems.columns.games == item_id)
    #     .values(is_refunded=True)
    # )
    item = db.update(orditems)
    val = item.values({"is_refunded": False})
    res = val.where(order_items.c.orders == order_id and order_items.c.games == item_id)
    db.session.execute(res)
    db.session.commit()

    game = [item for item in order.order_detail if item.id == item_id][0]



    print("orderrrrrrrrrrrrrrrrrr", item)


    return jsonify(order.to_dict())


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
