from datetime import date
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Game, Order, User, db, OrderItem
from app.forms import GameForm
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)


@order_routes.route('/')
@login_required
def get_orders():
    """
    GET orders of current user
    """
    orders = Order.query.filter(Order.customer_id==current_user.id).all()
    orders_list = [order.to_dict() for order in orders]

    return jsonify({"Orders": orders_list})


@order_routes.route('/<int:order_id>')
@login_required
def get_single_order(order_id):
    """
    GET single order of current user
    """
    order = Order.query.get(order_id)

    if order is None:
        return jsonify({'message': "Order couldn't be found", 'statusCode': 404}), 404

    if order.customer_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401


    return jsonify(order.to_dict())


@order_routes.route('/<int:order_id>/refund', methods=['PUT'])
@login_required
def refund_item(order_id):
    """
    refund item from an order of current user
    """

    order = Order.query.get(order_id)

    if order is None:
        return jsonify({'message': "Order couldn't be found", 'statusCode': 404}), 404

    if order.customer_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    item_id = request.json['itemId']

    order_items = OrderItem.query.filter(OrderItem.order_id == order_id, OrderItem.game_id == item_id).all()
    game = Game.query.get(item_id)

    for item in order_items:
        if item.is_refunded:
            return jsonify({'message': "You have previously refunded this item. Please contact Vapor support to continue. However, they will likely not respond to this buffoonery."})

    order_item = order_items[0]

    order_item.is_refunded = True
    order_item.amount = -order_item.amount
    order_item.refund_date = date.today()
    current_user.games_owned.remove(game)

    db.session.commit()

    return jsonify(order.to_dict())
    # orditems = db.metadata.tables['order_items']
    # # items = (
    # #     orditems.update()
    # #     .where(orditems.columns.orders == order_id and orditems.columns.games == item_id)
    # #     .values(is_refunded=True)
    # # )
    # item = db.update(orditems)
    # val = item.values({"is_refunded": False})
    # res = val.where(order_items.c.orders == order_id and order_items.c.games == item_id)
    # db.session.execute(res)
    # db.session.commit()

    # game = [item for item in order.order_detail if item.id == item_id][0]

    # print("orderrrrrrrrrrrrrrrrrr", current_user.to_dict())
