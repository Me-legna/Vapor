import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { load_one_game } from '../../store/games'
import './SingleGame.css'

function SingleGame() {
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
            <h6>AllGames {`> ${game.title ? `${game.genres[0]} > ${game.title}` : ''}`}</h6>
            <h1>{game.title}</h1>
        </>

    )
}

export default SingleGame
