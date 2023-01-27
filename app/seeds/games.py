from datetime import date
from platform import release
from app.models import db, Genre, System, Game, GameImage, environment, SCHEMA



# Adds a demo user, you can add other users here if you want
def seed_games():
    arcade = Genre(
        name='arcade'
    )
    moba = Genre(
        name='MOBA'
    )
    shooter = Genre(
        name='Shooter'
    )

    mac = System(
        name='MacOS'
    )
    windows = System(
        name='Windows'
    )
    vapor_os = System(
        name='VaporOS + Linux'
    )

    game_1 = Game(
        title='Pac-Man',
        developer_id=1,
        release_date=date(2022, 11, 7),
        price=59.99,
        description='This game is straight savage!',
        rating='E'
        )
    game_2 = Game(
        title='Smite',
        developer_id=1,
        release_date=date(2021, 11, 7),
        price=59.99,
        description='This game is straight savage!',
        rating='T'
        )
    game_3 = Game(
        title='League of Legends',
        developer_id=2,
        release_date=date(2022, 12, 7),
        price=59.99,
        description='This game is straight savage!',
        rating='T'
        )
    game_4 = Game(
        title='Call of Duty',
        developer_id=2,
        release_date=date(2023, 1, 20),
        price=59.99,
        description='This game is straight savage!',
        rating='M'
    )

    game_1_image1 = GameImage(
        url = 'https://geometrydash.io/data/image/pacman-30th-anniversary.jpg',
        is_preview = True,
        game=game_1
    )
    game_1_image2 = GameImage(
        url = 'https://freepacman.org/images/pacman-game-card.png',
        is_preview = False,
        game=game_1
    )
    game_2_image1 = GameImage(
        url = 'https://www.aroged.com/wp-content/uploads/2023/01/1673697820_SMITE-Magic-The-Gathering-Crossover-heralds-biggest-content-update.jpg',
        is_preview = True,
        game=game_2
    )
    game_3_image1 = GameImage(
        url = 'https://cdnportal.mobalytics.gg/production/2021/06/64779e0a-league-of-legends-game-bg.png',
        is_preview = True,
        game=game_3
    )
    game_4_image1 = GameImage(
        url = 'https://www.nicepng.com/png/detail/77-775555_call-of-duty-zombies-png-download-call-of.png',
        is_preview = True,
        game=game_4
    )

    db.session.add_all([arcade, moba, shooter])
    db.session.add_all([mac, windows, vapor_os])
    db.session.add_all([game_1, game_2,game_3,game_4])
    db.session.add_all([game_1_image1, game_1_image2, game_2_image1, game_3_image1, game_4_image1])

    arcade.games.append(game_1)
    moba.games.extend([game_2, game_3])
    shooter.games.append(game_4)

    mac.games.extend([game_1, game_4])
    windows.games.extend([game_1, game_2, game_3, game_4])
    vapor_os.games.extend([game_1, game_2, game_4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_genres RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.systems_availability RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.systems RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM game_genres")
        db.session.execute("DELETE FROM system_availability")
        db.session.execute("DELETE FROM game_images")
        db.session.execute("DELETE FROM games")
        db.session.execute("DELETE FROM systems")
        db.session.execute("DELETE FROM genres")

    db.session.commit()
