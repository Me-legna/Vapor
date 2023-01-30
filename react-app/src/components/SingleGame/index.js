import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { load_one_game } from '../../store/games'
import GameBody from './GameBody'
import GameMedia from './GameMedia'
import GameReviews from './GameReviews'
import './SingleGame.css'

function SingleGame() {
    const user = useSelector(state => state.session.user)
    const game = useSelector(state => state.games.singleGame)
    const dispatch = useDispatch()
    const { gameId } = useParams()

    useEffect(() => {
        dispatch(load_one_game(gameId))

    }, [dispatch, gameId])

    // if(!loaded) return null

    return (
        // <h1>SingleGame</h1>
        <>
            <header>
                <p>AllGames {`> ${game.title ? `${game.genres[0]} > ${game.title}` : ''}`}</p>
                <h1>{game.title}</h1>
                <div style={{ width: "10%" }}>
                    {user && user.id === game.developer_id && (
                        <div>
                            <button>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            &nbsp;

                            <button>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <section>
                <GameMedia />
            </section>
            <section>
                <GameBody />
            </section>
            {/* <section>
                <GameReviews/>
            </section> */}
        </>

    )
}

export default SingleGame
