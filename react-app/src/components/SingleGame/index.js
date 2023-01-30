import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { load_one_game } from '../../store/games'
import './SingleGame.css'

function SingleGame() {
    const game = useSelector(state => state.games.SingleGame)
    const dispatch = useDispatch()
    const {gameId} = useParams()

    useEffect(()=> {
        dispatch(load_one_game(gameId))
    },[dispatch, gameId])
    return (
        <h1>SingleGame</h1>
    )
}

export default SingleGame
