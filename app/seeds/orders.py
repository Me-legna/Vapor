from datetime import datetime
from app.models import db, User, Game, Order, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_orders():

    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)
    melegna = User.query.get(4)

    pac_man = Game.query.get(1)
    smite = Game.query.get(2)
    lol = Game.query.get(3)
    cod = Game.query.get(4)

    demo_order = Order(
        customer=demo,
        order_detail=[smite],
        type='Purchase',
        total=smite.price
        )
    marnie_order = Order(
        customer=marnie,
        order_detail=[pac_man, lol, cod],
        type='Purchase',
        total= pac_man.price + lol.price + cod.price
        )
    bobbie_order = Order(
        customer=bobbie,
        order_detail=[lol, smite],
        type='Purchase',
        total= lol.price + smite.price
        )
    melegna_order = Order(
        customer=melegna,
        order_detail=[pac_man, lol],
        type='Purchase',
        total= pac_man.price + lol.price
    )

    db.session.add_all([demo_order, marnie_order, bobbie_order, melegna_order])

    demo.games_owned.extend(demo_order.order_detail)
    marnie.games_owned.extend(marnie_order.order_detail)
    bobbie.games_owned.extend(bobbie_order.order_detail)
    melegna.games_owned.extend(melegna_order.order_detail)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the tables created. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.library RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM library")
        db.session.execute("DELETE FROM order_items")
        db.session.execute("DELETE FROM orders")

    db.session.commit()
