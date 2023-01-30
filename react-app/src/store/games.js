
//constants
const LOAD_ALL = 'games/LOAD_ALL';
const LOAD_ONE = 'games/LOAD_ONE';
const CREATE = 'games/CREATE'
const UPDATE = 'games/UPDATE'
const DELETE = 'games/DELETE'


//action creators
const loadAllGames = (games) => ({
    type: LOAD_ALL,
    payload: games
})
const loadOneGame = (game) => ({
    type: LOAD_ALL,
    payload: game
})
const createGame = (game) => ({
    type: LOAD_ALL,
    payload: game
})
const updateGame = (game) => ({
    type: LOAD_ALL,
    payload: game
})
const deleteGame = (gameId) => ({
    type: LOAD_ALL,
    payload: gameId
})


//Thunks
export const load_all_games = () => async (dispatch) => {
    const response = await fetch('/api/games/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(loadAllGames(data.Games))
    }
}

export const load_one_game = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(loadOneGame(data))
    }
}

export const create_game = (game) => async (dispatch) => {
    const response = await fetch('/api/games/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(createGame(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const update_game = (gameId, game) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(updateGame(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const delete_game = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });


    if (response.ok) {
        dispatch(deleteGame(gameId));

        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
}


const initialState = {
    allGames: {
        byId: {},
        allIds: []
    },
    singleGame: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL: {
            const allGames = action.payload
            const newState = {
                allGames: {
                    byId: {},
                    allIds: []
                },
                singleGame: {}
            }
            allGames.forEach(game => {
                newState.allGames.byId[game.id] = game
                newState.allGames.allIds.push(game.id)
            });

            return newState
        }
        case LOAD_ONE: {
            const gameDetails = action.payload
            const newState = { ...state, singleGame: gameDetails }


            return newState
        }
        case CREATE: {
            const newGame = action.payload
            const newState = {
                allGames: {
                    byId: {...state.allGames.byId},
                    allIds: [...state.allGames.allIds, newGame.id]
                },
                singleGame: newGame
            }

            newState.allGames.byId[newGame.id] = newGame

            return newState
        }
        case UPDATE: {
            const updatedGame = action.payload
            const newState = {
                allGames: {
                    byId: { ...state.allGames.byId },
                    allIds: [...state.allGames.allIds]
                },

                singleGame: updatedGame
            }
            newState.allGames.byId[updatedGame.id] = updatedGame

            return newState
        }
        case DELETE: {
            const deletedGameId = action.payload
            const newState = {
                allGames: {
                    byId: { ...state.allGames.byId },
                    allIds: state.allGames.allIds.filter(id => id !== deletedGameId)
                },
                singleGame: {}
            }

            delete newState.allGames.byId[deletedGameId]

            return newState
        }
        default:
            return state
    }
}
