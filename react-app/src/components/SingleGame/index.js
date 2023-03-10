import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { load_one_game } from '../../store/games'
import OpenModalButton from '../OpenModalButton'
import DeleteGameForm from './DeleteGameForm'
import EditGameForm from './EditGameForm'
import GameBody from './GameBody'
import GameMedia from './GameMedia'
import GameReviews from './GameReviews'
import './SingleGame.css'

function SingleGame() {
    const user = useSelector(state => state.session.user)
    const game = useSelector(state => state.games.singleGame)
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const { gameId } = useParams()

    useEffect(() => {
        if (!Object.keys(game).length) {
            if (gameId) {
                dispatch(load_one_game(gameId))
            }
        }
        setLoaded(true)
    }, [dispatch, history, game, gameId])

    // if(!loaded) return null

    return loaded && (
        // <h1>SingleGame</h1>
        <section>
            <header className='single-header'>
                <div className='single-header-left'>
                <p>AllGames {`> ${game.title ? `${game.genres[0]} > ${game.title}` : ''}`}</p>
                <h1>{game.title}</h1>
                </div>
                <div style={{ width: "10%", paddingTop: '2%' }}>
                    {user && user.id === game.developer_id && (
                        <div>
                            <OpenModalButton
                                modalComponent={<EditGameForm />}
                                faIcon={<i className="fa-solid fa-pen-to-square"></i>}
                            />
                            <br />
                            <OpenModalButton
                                modalComponent={<DeleteGameForm />}
                                faIcon={<i className="fa-solid fa-trash-can"></i>}
                            />
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
        </section>

    )
}

export default SingleGame
