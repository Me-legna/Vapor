from datetime import date
from turtle import title
from app.models import db, Genre, System, Game, GameMedia, User, environment, SCHEMA, game


# Adds Games, Genres, and Systems
def seed_games():
    # ------ Systems ------ #
    mac = System(
        name='MacOS'
    )
    windows = System(
        name='Windows'
    )
    vapor_os = System(
        name='VaporOS + Linux'
    )
    db.session.add_all([mac, windows, vapor_os])

    # ------ Genres ------ #
    f2p = Genre(
        name='Free to Play'
    )
    multiplayer = Genre(
        name='Multiplayer'
    )
    shooter = Genre(
        name='Shooter'
    )
    battle_royale = Genre(
        name='Battle Royale'
    )
    jrpg = Genre(
        name='J-RPG'
    )
    social_simulation = Genre(
        name='Social Simulation'
    )

    db.session.add_all([jrpg, social_simulation])



    # ----------------------------------- Games ----------------------------------- #

    # ------ Animal Crossing ------ #
    animal_crossing = Game(
        systems=[vapor_os],
        genres=[jrpg,social_simulation],
        title='Animal Crossing: New Horizons',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Animal_Crossing/animalcrossing-1.jpg',
        developer_id=4,
        producer='Nintendo',
        release_date=date(2020, 3, 20),
        rating='E',
        price=59.99,
        description='Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game.',
        about=ac_about
    )

    animal_crossing_image1 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Animal_Crossing/animalcrossing-2.jpg',
        game=animal_crossing
    )
    animal_crossing_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Animal_Crossing/animalcrossing-3.jpg',
        game=animal_crossing
    )
    animal_crossing_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Animal_Crossing/animalcrossing-4.jpg',
        game=animal_crossing
    )
    animal_crossing_image4 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Animal_Crossing/animalcrossing-5.jpg',
        game=animal_crossing
    )
    animal_crossing_image5 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Animal_Crossing/animalcrossing-6.jpg',
        game=animal_crossing
    )

    db.session.add(animal_crossing)
    # db.session.add_all([animal_crossing_image1,animal_crossing_image2, animal_crossing_image3, animal_crossing_image4, animal_crossing_image5])

    # ------ Apex Legends ------ #

    apex_legends = Game(
        systems=[windows],
        genres=[f2p, multiplayer, shooter, battle_royale],
        title='Apex Legends',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-1.jpeg',
        developer_id=4,
        producer='Respawn Entertainment',
        release_date=date(2019, 2, 19),
        rating='T',
        price=0,
        description='Apex Legends is the award-winning, free-to-play Hero Shooter from Respawn Entertainment. Master an ever-growing roster of legendary characters with powerful abilities, and experience strategic squad play and innovative gameplay in the next evolution of Hero Shooter and Battle Royale.',
        about=al_about
    )

    apex_legends_video1 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256930469/movie480_vp9.webm?t=1676397705',
        game=apex_legends,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/xjLycEuBC_s/maxresdefault.jpg'
    )
    apex_legends_video2 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256930468/movie480_vp9.webm?t=1676397711',
        game=apex_legends,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/vgRpFAeEAn4/maxresdefault.jpg'
    )
    apex_legends_video3 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256930465/movie480_vp9.webm?t=1676397716',
        game=apex_legends,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/X8dG4k1wEmI/maxresdefault.jpg'
    )

    apex_legends_image1 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-2.jpeg',
        game=apex_legends
    )
    apex_legends_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-3.jpeg',
        game=apex_legends
    )
    apex_legends_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-4.jpeg',
        game=apex_legends
    )
    apex_legends_image4 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-5.jpeg',
        game=apex_legends
    )
    apex_legends_image5 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-6.jpeg',
        game=apex_legends
    )

    db.session.add(apex_legends)

    # melegna = User.query.get(4)

    # melegna.games_owned.extend([animal_crossing, apex_legends])

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_media RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.systems RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM game_genres")
        db.session.execute("DELETE FROM system_availability")
        db.session.execute("DELETE FROM game_media")
        db.session.execute("DELETE FROM games")
        db.session.execute("DELETE FROM systems")
        db.session.execute("DELETE FROM genres")

    db.session.commit()


ac_about="""Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round.

        Show off your island utopia to family and friends—or pack your bags and visit theirs. Whether playing online** or with others beside you***, island living is even better when you can share it. Even without hopping on a flight, you’ll meet a cast of charming animal residents bursting with personality. Friendly faces like Tom Nook and Isabelle will lend their services and happily help you grow your budding community. Escape to your island getaway—however, whenever, and wherever you want.

        Build your community from scratch on a deserted island brimming with possibility

        Create your personal getaway and customize your character, home, decorations, and even the landscape itself

        Collect materials to construct everything from furniture to tools! Then, use what you create to give your island a personal touch

        Watch as the time of day and seasons match real life—even your hemisphere! Each day holds potential for surprises and discoveries

        Get to know the island residents, garden, fish, decorate, hunt for fossils, and more!

        Show off your paradise – play on the same system with a total of 4 people***, or play together online** or over local wireless*** for fun with up to 8 players"""


al_about="""Conquer with character in Apex Legends, a free-to-play* Hero shooter where legendary characters with powerful abilities team up to battle for fame & fortune on the fringes of the Frontier.

Master an ever-growing roster of diverse Legends, deep-tactical squad play, and bold, new innovations that go beyond the Battle Royale experience — all within a rugged world where anything goes. Welcome to the next evolution of Hero Shooter.
"""

# from datetime import date
# from app.models import db, Genre, System, Game, GameMedia, User, environment, SCHEMA, game



# # Adds Games, Genres, and Systems
# def seed_games():
#     arcade = Genre(
#         name='Arcade'
#     )
#     moba = Genre(
#         name='MOBA'
#     )
#     shooter = Genre(
#         name='Shooter'
#     )

#     mac = System(
#         name='MacOS'
#     )
#     windows = System(
#         name='Windows'
#     )
#     vapor_os = System(
#         name='VaporOS + Linux'
#     )

#     game_1 = Game(
#         title='Pac-Man',
#         cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/pacman_cover_1600x960.jpeg',
#         developer_id=1,
#         release_date=date(2022, 11, 7),
#         price=59.99,
#         description='This game is straight savage!',
#         about='This game is straight savage!',
#         rating='E'
#         )
#     game_2 = Game(
#         title='Smite',
#         cover_image='https://www.aroged.com/wp-content/uploads/2023/01/1673697820_SMITE-Magic-The-Gathering-Crossover-heralds-biggest-content-update.jpg',
#         developer_id=4,
#         release_date=date(2021, 11, 7),
#         price=0,
#         description='This game is straight savage!',
#         about='This game is straight savage!',
#         rating='T'
#         )
#     game_3 = Game(
#         title='League of Legends',
#         cover_image='https://cdnportal.mobalytics.gg/production/2021/06/64779e0a-league-of-legends-game-bg.png',
#         developer_id=1,
#         release_date=date(2022, 12, 7),
#         price=0,
#         description='This game is straight savage!',
#         about='This game is straight savage!',
#         rating='T'
#         )
#     game_4 = Game(
#         title='Call of Duty',
#         cover_image='https://www.nicepng.com/png/detail/77-775555_call-of-duty-zombies-png-download-call-of.png',
#         developer_id=4,
#         release_date=date(2023, 1, 20),
#         price=59.99,
#         description='This game is straight savage!',
#         about='This game is straight savage!',
#         rating='M'
#     )

#     game_1_video1 = GameMedia(
#         url = 'https://cdn.akamai.steamstatic.com/steam/apps/256918897/movie_max_vp9.webm?t=1669908749',
#         game=game_1,
#         is_video=True,
#         thumbnail_url = 'https://freepacman.org/images/pacman-game-card.png'
#     )
#     game_1_video2 = GameMedia(
#         url = 'https://cdn.akamai.steamstatic.com/steam/apps/256867710/movie480_vp9.webm?t=1641402419',
#         game=game_1,
#         is_video=True,
#         thumbnail_url = 'https://freepacman.org/images/pacman-game-card.png'
#     )
#     game_1_image2 = GameMedia(
#         url = 'https://freepacman.org/images/pacman-game-card.png',
#         game=game_1
#     )
#     game_1_image3 = GameMedia(
#         url = 'https://npr.brightspotcdn.com/dims4/default/36c6d59/2147483647/strip/true/crop/535x535+0+0/resize/880x880!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkuar%2Ffiles%2F201504%2Fpac-man.png',
#         game=game_1
#     )
#     game_1_image4 = GameMedia(
#         url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSyN2zJi8hU0ZllgOh3NJdBmthicv438xGkAlTVwTZl4f9x8H_yrruWm2vroSGEnPJfRE&usqp=CAU',
#         game=game_1
#     )
#     game_1_image5 = GameMedia(
#         url = 'https://www.split.io/wp-content/uploads/2021/06/BLOG-PacMan.png',
#         game=game_1
#     )
#     game_1_image6 = GameMedia(
#         url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzU6xWnZb7Zo7Fv0YIge75oKHMhZeApnQd5m2v2VkDSURsP9B9dff51WoLD0KJmaCgAo&usqp=CAU',
#         game=game_1
#     )
#     game_1_image7 = GameMedia(
#         url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68FDP-FE6YJw15FUR_Xse0NliQfdKH4ZGvQrUJPzpYGdQWvnNLA8dkFhONJRreHVlpxY&usqp=CAU',
#         game=game_1
#     )

#     db.session.add_all([arcade, moba, shooter])
#     db.session.add_all([mac, windows, vapor_os])
#     db.session.add_all([game_1, game_2,game_3,game_4])
#     db.session.add_all([game_1_video1, game_1_video2,game_1_image2, game_1_image3, game_1_image4, game_1_image5, game_1_image6, game_1_image7])
#     # db.session.add_all([game_1_video2,game_1_image2, game_1_image3, game_1_image4, game_1_image5, game_1_image6, game_1_image7])

#     game_1.genres.append(arcade)
#     game_2.genres.append(moba)
#     game_3.genres.append(moba)
#     game_4.genres.append(shooter)

#     game_1.systems.extend([mac, windows, vapor_os])
#     game_2.systems.extend([windows, vapor_os])
#     game_3.systems.append(windows)
#     game_4.systems.extend([mac, windows, vapor_os])

#     demo = User.query.get(1)
#     melegna = User.query.get(4)

#     demo.games_owned.extend([game_1, game_3])
#     melegna.games_owned.extend([game_2, game_4])

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the tables created. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_games():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.game_genres RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.system_availability RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.game_media RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.systems RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM game_genres")
#         db.session.execute("DELETE FROM system_availability")
#         db.session.execute("DELETE FROM game_media")
#         db.session.execute("DELETE FROM games")
#         db.session.execute("DELETE FROM systems")
#         db.session.execute("DELETE FROM genres")

#     db.session.commit()
