from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, Game, Order, User, db
from app.forms import GameForm
from app.models.order import OrderItem
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/')
@login_required
def get_cart():
    """
    Get cart of current user
    """
    cart = Cart.query.filter(Cart.user_id==current_user.id).one()

    return jsonify(cart.to_dict())


@cart_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
    """
    Add free item to library of current user
    Add non-free item to cart of current user
    """
    item_id = request.json['item_id']

    game = Game.query.get(item_id)
    cart = Cart.query.filter(Cart.user_id==current_user.id).one()


    if game not in cart.items:
        if game.price == 0:
            new_order =  Order(
            customer=current_user,
            order_detail=[OrderItem(game=game, amount=game.price)],
            type='Purchase',
            total=0
            )
            current_user.games_owned.append(game)
            db.session.add(new_order)
            db.session.commit()
        else:
            cart.items.append(game)
            cart.total += game.price
            db.session.commit()


    return jsonify(cart.to_dict())

@cart_routes.route('/', methods=['PUT'])
@login_required
def remove_from_cart():
    """
    remove item from cart of current user
    """
    item_id = request.json['item_id']

    game = Game.query.get(item_id)
    cart = Cart.query.filter(Cart.user_id==current_user.id).one()

    if game in cart.items:
        cart.items.remove(game)
        cart.total -= game.price
        db.session.commit()

    return jsonify(cart.to_dict())

@cart_routes.route('/', methods=['DELETE'])
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
        new_order = Order(
        customer=current_user,
        order_detail=[OrderItem(game=item, amount=item.price) for item in cart.items],
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
    # else:
    #     cart.items = []
    #     cart.total = 0
    #     db.session.commit()
    #     return jsonify(cart.to_dict())
        # return jsonify({'message': 'Order feature incoming'})
