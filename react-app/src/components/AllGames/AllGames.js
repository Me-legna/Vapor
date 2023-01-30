import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { load_all_games } from '../../store/games'
import './HomePage.css'


function AllGames() {
    const allGamesObj = useSelector(state => state.games.allGames.byId)
    const allGamesArr = Object.values(allGamesObj)
    const dispatch = useDispatch()
    console.log(allGamesArr)

    useEffect(() => {
        dispatch(load_all_games())
    }, [dispatch])

    return allGamesArr.length && (
        <>
            <div className='games-list-container'>

                {allGamesArr.map(game => (
                    <div className='indiv-game' key={game.title}>
                        <NavLink to={`/games/${game.id}`}>
                            <div className='game-list-image-container'>
                                <img className='game-list-image' src={game.media.find(image => image.is_preview === true).url} alt='game-img'></img>
                            </div>
                            <div>
                                <div>
                                    {game.title}
                                </div>
                                <div>
                                    {game.systems.map(system => (
                                        system === 'Windows'
                                            ?
                                            <i key={`${system.id}`} className="fa-brands fa-windows"></i>
                                            : system === 'MacOS'
                                                ?
                                                <i key={`${system.id}`} className="fa-brands fa-apple"></i>
                                                : system === 'VaporOS + Linux'
                                                    ?
                                                    <i key={`${system.id}`} className="fa-solid fa-smog"></i>
                                                    :
                                                    <></>
                                    ))}
                                </div>
                                <div>
                                    {game.genres.map((genre, idx) => (
                                        idx === 0
                                            ? genre
                                            : `, ${genre}`
                                    ))}
                                </div>
                            </div>
                            <div>
                                {game.price > 0 ? `$${game.price}` : 'Free'}
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AllGames
