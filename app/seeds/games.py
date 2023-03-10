from datetime import date
from app.models import db, Genre, System, Game, GameImage, User, environment, SCHEMA



# Adds Games, Genres, and Systems
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
        cover_image='https://geometrydash.io/data/image/pacman-30th-anniversary.jpg',
        developer_id=1,
        release_date=date(2022, 11, 7),
        price=59.99,
        description='This game is straight savage!',
        about='This game is straight savage!',
        rating='E'
        )
    game_2 = Game(
        title='Smite',
        cover_image='https://www.aroged.com/wp-content/uploads/2023/01/1673697820_SMITE-Magic-The-Gathering-Crossover-heralds-biggest-content-update.jpg',
        developer_id=4,
        release_date=date(2021, 11, 7),
        price=0,
        description='This game is straight savage!',
        about='This game is straight savage!',
        rating='T'
        )
    game_3 = Game(
        title='League of Legends',
        cover_image='https://cdnportal.mobalytics.gg/production/2021/06/64779e0a-league-of-legends-game-bg.png',
        developer_id=1,
        release_date=date(2022, 12, 7),
        price=0,
        description='This game is straight savage!',
        about='This game is straight savage!',
        rating='T'
        )
    game_4 = Game(
        title='Call of Duty',
        cover_image='https://www.nicepng.com/png/detail/77-775555_call-of-duty-zombies-png-download-call-of.png',
        developer_id=4,
        release_date=date(2023, 1, 20),
        price=59.99,
        description='This game is straight savage!',
        about='This game is straight savage!',
        rating='M'
    )

    game_1_image2 = GameImage(
        url = 'https://freepacman.org/images/pacman-game-card.png',
        game=game_1
    )

    db.session.add_all([arcade, moba, shooter])
    db.session.add_all([mac, windows, vapor_os])
    db.session.add_all([game_1, game_2,game_3,game_4])
    db.session.add(game_1_image2)

    game_1.genres.append(arcade)
    game_2.genres.append(moba)
    game_3.genres.append(moba)
    game_4.genres.append(shooter)

    game_1.systems.extend([mac, windows, vapor_os])
    game_2.systems.extend([windows, vapor_os])
    game_3.systems.append(windows)
    game_4.systems.extend([mac, windows, vapor_os])

    demo = User.query.get(1)
    melegna = User.query.get(4)

    demo.games_owned.extend([game_1, game_3])
    melegna.games_owned.extend([game_2, game_4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the tables created. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_genres RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.system_availability RESTART IDENTITY CASCADE;")
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
