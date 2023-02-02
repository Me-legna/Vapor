from app.models import db, Cart, User, Game, environment, SCHEMA


# Adds a cart for each user
def seed_carts():
    demo_cart = Cart(
        user_id=1
        )
    marnie_cart = Cart(
        user_id=2
        )
    bobbie_cart = Cart(
        user_id=3
        )
    melegna_cart = Cart(
        user_id=4
    )

    db.session.add(demo_cart)
    db.session.add(marnie_cart)
    db.session.add(bobbie_cart)
    db.session.add(melegna_cart)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the tables created. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
