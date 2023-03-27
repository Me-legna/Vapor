from datetime import date
from platform import release
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, GameMedia, System, Genre, db
from app.forms import GameForm
from .auth_routes import validation_errors_to_error_messages

game_routes = Blueprint('games', __name__)


@game_routes.route('/')
def get_all_games():
    """
    Get all games available
    """
    games = Game.query.filter(Game.is_in_store == True).all()
    games_list = []
    for game in games:
        game_dict = game.to_dict()

        systems = [system.name for system in game.systems]
        genres = [genre.name for genre in game.genres]
        # developer = game.developer.developer_alias

        game_dict['systems'] = systems
        game_dict['genres'] = genres
        # game_dict['developer'] = developer

        games_list.append(game_dict)


    return jsonify({'Games': games_list})


@game_routes.route('/<int:game_id>')
def get_single_game(game_id):
    """
    Get a single game's details
    """

    game = Game.query.get(game_id)

    if game is None:
        return jsonify({'message': "Game couldn't be found", 'statusCode': 404}), 404

    game_dict = game.to_dict()
    systems = [system.name for system in game.systems]
    genres = [genre.name for genre in game.genres]
    # developer = game.developer.developer_alias
    game_dict['systems'] = systems
    game_dict['genres'] = genres
    # game_dict['developer'] = developer

    return jsonify(game_dict)


@game_routes.route('/', methods=['POST'])
@login_required
def create_game():
    """
    Creates and returns a game.
    """
    json_date = request.json['release_date']
    json_systems = request.json['systems']
    json_genres = request.json['genres']

    release_date = date(*json_date)
    systems = System.query.filter(System.name.in_(json_systems)).all()
    genres = Genre.query.filter(Genre.name.in_(json_genres)).all()
    # date_list = [int(date_comp) for date_comp in json_date]
    # print('date', new)


    # str(date.year) + '-' + str(date.month)

    # return jsonify({'date': release_date})
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game(
            title=form.data['title'],
            developer_id=current_user.id,
            release_date=release_date,
            cover_image=request.json['previewUrl'],
            price=form.data['price'],
            description=form.data['description'],
            about=form.data['about'],
            rating=form.data['rating'],
            systems=systems,
            genres=genres
        )

        db.session.add(game)
        # current_user.games_owned.append(game)

        db.session.commit()

        game_dict = game.to_dict()
        systems = [system.name for system in game.systems]
        genres = [genre.name for genre in game.genres]
        developer = game.developer.developer_alias
        game_dict['systems'] = systems
        game_dict['genres'] = genres
        game_dict['developer'] = developer

        return game_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@game_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def update_game(game_id):
    """
    Updates and returns a game.
    """
    # with db.session.no_autoflush:
    #     game = Game.query.get(game_id)
    game = Game.query.get(game_id)

    if game is None:
        return jsonify({'message': "Game couldn't be found", 'statusCode': 404}), 404

    if game.developer_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    # return jsonify({'game': game.to_dict()})
    json_systems = request.json['systems']
    json_genres = request.json['genres']
    json_cover = request.json['previewUrl']

    systems = System.query.filter(System.name.in_(json_systems)).all()
    genres = Genre.query.filter(Genre.name.in_(json_genres)).all()

    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game.title=form.data['title']
        game.cover_image=json_cover
        game.price=form.data['price']
        game.description=form.data['description']
        game.about=form.data['about']
        game.rating=form.data['rating']
        game.systems=systems
        game.genres=genres

        db.session.commit()
        game_dict = game.to_dict()
        systems = [system.name for system in game.systems]
        genres = [genre.name for genre in game.genres]
        developer = game.developer.developer_alias
        game_dict['systems'] = systems
        game_dict['genres'] = genres
        game_dict['developer'] = developer

        return game_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@game_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def delete_game(game_id):
    """
    Deletes a game and returns a message.
    """

    game = Game.query.get(game_id)

    if game is None:
        return jsonify({'message': "Game couldn't be found", 'statusCode': 404}), 404

    if game.developer_id != current_user.id:
        return jsonify({'message': "Unauthorized", 'statusCode': 401}), 401

    # db.session.delete(game)
    game.is_in_store=False
    db.session.commit()

    return jsonify({'message': "Successfully deleted", 'statusCode': 200}), 200


@game_routes.route('/genres')
def get_all_genres():
    """
    Get all genres available
    """
    genres = Genre.query.all()

    return jsonify({'Genres': [genre.name for genre in genres]})


@game_routes.route('/genres/')
def get_genre():
    """
    Get a genre's details
    """
    genre_name = request.json['genreName']

    genre = Genre.query.filter(Genre.name == genre_name).one()

    return jsonify({'Genre': genre.to_dict()})
