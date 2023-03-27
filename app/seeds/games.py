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
    fps = Genre(
        name='FPS'
    )
    rpg = Genre(
        name='RPG'
    )
    arcade = Genre(
        name='Arcade'
    )
    classic = Genre(
        name='Classic'
    )
    retro = Genre(
        name='Retro'
    )
    choices_matter = Genre(
        name='Choices Matter'
    )
    story_rich = Genre(
        name='Story Rich'
    )
    tps = Genre(
        name='Third-Person Shooter'
    )
    horror = Genre(
        name='Horror'
    )
    sci_fi = Genre(
        name='Sci-fi'
    )
    space = Genre(
        name='Space'
    )
    fighting = Genre(
        name='Fighting'
    )
    platformer = Genre(
        name='Platformer'
    )
    two_d_fighter = Genre(
        name='2D Fighter'
    )
    action = Genre(
        name='Action'
    )
    singleplayer = Genre(
        name='Singleplayer'
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
        publisher='Nintendo',
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

    # ------ Apex Legends ------ #

    apex_legends = Game(
        systems=[windows],
        genres=[f2p, multiplayer, shooter, battle_royale],
        title='Apex Legends',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Apex_Legends/apex-1.jpeg',
        developer_id=4,
        producer='Respawn Entertainment',
        publisher='Electronic Arts',
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

    # ------ Brawlhalla ------ #

    brawlhalla = Game(
        systems=[windows, mac, vapor_os],
        genres=[f2p, multiplayer, fighting,two_d_fighter],
        title='Brawlhalla',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Brawlhalla/brawlhalla-2.jpeg',
        developer_id=4,
        producer='Blue Mammoth Games',
        publisher='Ubisoft',
        release_date=date(2017, 10, 27),
        rating='E10+',
        price=0,
        description="An epic platform fighter for up to 8 players online or local. Try casual free-for-alls, ranked matches, or invite friends to a private room. And it's free! Play cross-platform with millions of players on PlayStation, Xbox, Nintendo Switch, iOS, Android, Steam, and Vapor! Frequent updates. Over fifty Legends.",
        about=brawl_about
    )

    brawlhalla_video1 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256916616/movie480_vp9.webm?t=1668629801',
        game=brawlhalla,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/R282_i3oaGE/maxresdefault.jpg'
    )
    brawlhalla_video2 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256861558/movie480_vp9.webm?t=1637596017',
        game=brawlhalla,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/7LXK_iSurmw/maxresdefault.jpg'
    )

    brawlhalla_image1 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Brawlhalla/brawlhalla-1.jpeg',
        game=brawlhalla
    )
    brawlhalla_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Brawlhalla/brawlhalla-3.jpeg',
        game=brawlhalla
    )
    brawlhalla_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Brawlhalla/brawlhalla-4.jpeg',
        game=brawlhalla
    )
    brawlhalla_image4 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Brawlhalla/brawlhalla-5.jpeg',
        game=brawlhalla
    )

    # ------ Call of Duty: Modern Warfare II ------ #

    cod_mw2 = Game(
        systems=[windows],
        genres=[fps,action, multiplayer, shooter, singleplayer],
        title='Call of Duty: Modern Warfare II',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Call_of_Duty_Modern_Warfare/cod-1.jpeg',
        developer_id=4,
        producer='Infinity Ward',
        publisher='Activision',
        release_date=date(2022, 10, 27),
        rating='M',
        price=69.99,
        description="Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141.",
        about=cod_about
    )

    cod_mw2_video1 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256930493/movie480_vp9.webm?t=1676401338',
        game=cod_mw2,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/R282_i3oaGE/maxresdefault.jpg'
    )
    cod_mw2_video2 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256930310/movie480_vp9.webm?t=1676316567',
        game=cod_mw2,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/rZBRnbEHVUA/maxresdefault.jpg'
    )

    cod_mw2_image1 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Call_of_Duty_Modern_Warfare/cod-2.jpg',
        game=cod_mw2
    )
    cod_mw2_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Call_of_Duty_Modern_Warfare/cod-3.jpg',
        game=cod_mw2
    )
    cod_mw2_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Call_of_Duty_Modern_Warfare/cod-4.jpeg',
        game=cod_mw2
    )
    cod_mw2_image4 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Call_of_Duty_Modern_Warfare/cod-5.jpeg',
        game=cod_mw2
    )

    # ------ Dead Space ------ #

    dead_space = Game(
        systems=[windows, vapor_os],
        genres=[tps, horror, sci_fi, space],
        title='Dead Space',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Dead_Space/DS-1.jpg',
        developer_id=4,
        producer='Motive',
        publisher='Electronic Arts',
        release_date=date(2023, 1, 27),
        rating='M',
        price=59.99,
        description="The sci-fi survival-horror classic returns, completely rebuilt to offer an even more immersive experience — including visual, audio, and gameplay improvements — while staying faithful to the original game’s thrilling vision.",
        about=dead_space_about
    )

    dead_space_video1 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256929315/movie480_vp9.webm?t=1675772698',
        game=dead_space,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/cTDJNZ9cK1w/maxresdefault.jpg'
    )
    dead_space_video2 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256927035/movie480_vp9.webm?t=1674835402',
        game=dead_space,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/C1yiuM7blIw/maxresdefault.jpg'
    )
    dead_space_video3 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256927035/movie480_vp9.webm?t=1674835402',
        game=dead_space,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/2YetebGkdJ4/maxresdefault.jpg'
    )
    dead_space_video4 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256932900/movie480_vp9.webm?t=1677522851',
        game=dead_space,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/w6SGWZGK3-E/maxresdefault.jpg'
    )
    dead_space_video5 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256911793/movie480_vp9.webm?t=1674835993',
        game=dead_space,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/rZBRnbEHVUA/maxresdefault.jpg'
    )

    dead_space_image1 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Dead_Space/DS-2.jpg',
        game=dead_space
    )
    dead_space_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Dead_Space/DS-4.jpg',
        game=dead_space
    )
    dead_space_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Dead_Space/DS-5.jpg',
        game=dead_space
    )

    # ------ Mass Effect: Legendary Edition ------ #

    mass_effect = Game(
        systems=[windows, vapor_os],
        genres=[rpg, choices_matter, story_rich, sci_fi, action],
        title='Mass Effect: Legendary Edition',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Mass_Effect/ME-1.jpeg',
        developer_id=4,
        producer='BioWare',
        publisher='Electronic Arts',
        release_date=date(2021, 5, 14),
        rating='M',
        price=59.99,
        description="The Mass Effect™ Legendary Edition includes single-player base content and over 40 DLC from the highly acclaimed Mass Effect, Mass Effect 2, and Mass Effect 3 games, including promo weapons, armors, and packs — remastered and optimized for 4K Ultra HD.",
        about=mass_effect_about
    )

    mass_effect_video1 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256836016/movie480_vp9.webm?t=1621958368',
        game=mass_effect,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/q0lVjqxF0C0/maxresdefault.jpg'
    )
    mass_effect_video2 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256830146/movie480_vp9.webm?t=1618332556',
        game=mass_effect,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/UAScSKBDuno/maxresdefault.jpg'
    )
    mass_effect_video3 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256820668/movie480_vp9.webm?t=1612284537',
        game=mass_effect,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/n8i53TtQ6IQ/maxresdefault.jpg'
    )

    mass_effect_image1 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Mass_Effect/ME-2.jpeg',
        game=mass_effect
    )
    mass_effect_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Mass_Effect/ME-3.jpg',
        game=mass_effect
    )
    mass_effect_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Mass_Effect/ME-4.jpg',
        game=mass_effect
    )
    mass_effect_image4 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Mass_Effect/ME-5.jpg',
        game=mass_effect
    )

    # ------ Pac-Man ------ #

    pac_man = Game(
        systems=[windows, vapor_os],
        genres=[action, arcade, classic, retro],
        title='Pac-Man',
        cover_image='https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/pacman_cover_1600x960.jpeg',
        developer_id=4,
        producer='Bandai Namco Studios Inc.',
        publisher='Bandai Namco Entertainment',
        release_date=date(2016, 4, 19),
        rating='E',
        price=3.99,
        description="First released in arcades in 1980, the masterpiece PAC-MAN comes to Steam! Move PAC-MAN up, down, left, and right to avoid the ghosts and gobble up all the Pac-Dots!",
        about=pac_man_about
    )

    pac_man_video1 = GameMedia(
        url = 'https://cdn.akamai.steamstatic.com/steam/apps/256662186/movie480.webm?t=1462401823',
        game=pac_man,
        is_video=True,
        thumbnail_url = 'https://i.ytimg.com/vi/XeciGKbAm8U/maxresdefault.jpg'
    )

    pac_man_image2 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/BLOG-PacMan.png',
        game=pac_man
    )
    pac_man_image3 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/Newer_Pacman.jpeg',
        game=pac_man
    )
    pac_man_image4 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/pacman_4ghost.png',
        game=pac_man
    )
    pac_man_image5 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/pacman_99.jpeg',
        game=pac_man
    )
    pac_man_image6 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/pacman_start.jpeg',
        game=pac_man
    )
    pac_man_image7 = GameMedia(
        url = 'https://vapor-bucket.s3.us-east-2.amazonaws.com/Pac-Man/pacman-game-card.png',
        game=pac_man
    )

    db.session.add_all([animal_crossing, apex_legends, brawlhalla, cod_mw2, dead_space, mass_effect, pac_man])

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

brawl_about="""Brawlhalla: History's greatest warriors brawl to prove who's the best in an epic test of strength and skill. These slugfests are salted with powerful weapons and gadgets. Every weapon you pick up changes your style of play

Brawlhalla is a free 2D platform fighting game that supports up to 8 local or online players with full cross-play for PC, PS5, PS4, Xbox Series X|S, Xbox One, Nintendo Switch, iOS and Android!"""

cod_about="""Existing Modern Warfare® II Digital Standard Edition owners can upgrade to the Vault Edition as part of a limited time offer.

Welcome to the new era of Call of Duty®.

Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale, high-stakes infiltration tactical ops to highly classified missions, players will deploy alongside friends in a truly immersive experience.

Infinity Ward brings fans state-of-the-art gameplay, with all-new gun handling, advanced AI system, a new Gunsmith and a suite of other gameplay and graphical innovations that elevate the franchise to new heights.

Modern Warfare® II launches with a globe-trotting single-player campaign, immersive Multiplayer combat, and a narrative-driven, co-op Special Ops experience.

You also get access to Call of Duty®: Warzone™ 2.0, the all-new Battle Royale experience."""

dead_space_about="""The sci-fi survival-horror classic Dead Space™ returns, completely rebuilt from the ground up to offer a deeper, more immersive experience. This remake brings jaw-dropping visual fidelity, suspenseful atmospheric audio, and improvements to gameplay while staying faithful to the original game’s thrilling vision.

Isaac Clarke is an everyman engineer on a mission to repair a vast mining ship, the USG Ishimura, only to discover something has gone horribly wrong. The ship's crew has been slaughtered and Isaac’s beloved partner, Nicole, is lost somewhere on board.

Now alone and armed with only his engineering tools and skills, Isaac races to find Nicole as the nightmarish mystery of what happened aboard the Ishimura unravels around him. Trapped with hostile creatures called Necromorphs, Isaac faces a battle for survival, not only against the escalating terrors of the ship but against his own crumbling sanity."""

mass_effect_about="""One person is all that stands between humanity and the greatest threat it’s ever faced. Relive the legend of Commander Shepard in the highly acclaimed Mass Effect trilogy with the Mass Effect™ Legendary Edition. Includes single-player base content and over 40 DLC from Mass Effect, Mass Effect 2, and Mass Effect 3 games, including promo weapons, armors and packs — remastered and optimized for 4K Ultra HD.

Experience an amazingly rich and detailed universe where your decisions have profound consequences on the action and the outcome."""


pac_man_about="""First appearing in arcades in 1980, the masterpiece PAC-MAN finally comes to Steam!
Move PAC-MAN up, down, left, and right to eat all the Pac-Dots, while avoiding the ghosts, to advance to the next stage.
Eat a Power Pellet to turn the tables on the ghosts and rack up a huge score!

With simple rules but deep gameplay, it's easy to see why the adorable PAC-MAN took the world by storm!
PAC-MAN was awarded the Guinness World Record in 2005 for being the most successful coin-operated arcade machine in history.

This latest port comes with scanline and sound settings, and the option to play with the Round 256 bug - perfect for PAC-MANiacs!
Experience the masterpiece that charmed the planet!
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
