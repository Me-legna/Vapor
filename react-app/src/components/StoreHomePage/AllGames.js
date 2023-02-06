import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { load_all_games, load_one_game } from '../../store/games'
import logo from '../../images/vapor-icon.png'
import './HomePage.css'


function AllGames() {
    const allGamesObj = useSelector(state => state.games.allGames.byId)
    const allGamesArr = Object.values(allGamesObj)
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(allGamesArr)

    useEffect(() => {
        dispatch(load_all_games())
    }, [dispatch])

    async function handleClick(gameId){
        await dispatch(load_one_game(gameId))
            .then(() => history.push(`/games/${gameId}`))

    }
    const addDefaultSrc = (e) => {
        e.target.onerror = null; // prevents looping
        e.target.src = logo
    }

    return allGamesArr.length && (
        <>
            <div className='games-list-container'>

                {allGamesArr.map(game => (
                    // <NavLink className='indiv-game-nav' key={game.title} to={`/games/${game.id}`}>
                    <div key={game.id} className='indiv-game' onClick={() => handleClick(game.id)}>
                        {console.log('game', game)}
                        <div className='game-list-image-container'>
                            <img className='game-list-image' src={game.media.find(image => image.is_preview === true).url} onError={addDefaultSrc} alt='game-img'></img>
                        </div>
                        <div>
                            <div className='game-list-title'>
                                {game.title}
                            </div>
                            <div className='system-icon-container'>
                                {game.systems.map(system => (
                                    system === 'Windows'
                                        ?
                                        <i key={`${system.id}`} className="system-icon fa-brands fa-windows"></i>
                                        : system === 'MacOS'
                                            ?
                                            <i key={`${system.id}`} className="system-icon fa-brands fa-apple"></i>
                                            : system === 'VaporOS + Linux'
                                                ?
                                                <img key={`${system.id}`} src={logo} alt='logo' className="system-icon logo"></img>
                                                :
                                                <></>
                                ))}
                            </div>
                            <div style={{ padding:'5px 10px 5px 10px', fontSize:'15px',color:'grey'}}>
                                {game.genres.map((genre, idx) => (
                                    idx === 0
                                        ? genre
                                        : `, ${genre}`
                                ))}
                            </div>
                        </div>
                        <div style={{ marginLeft: "40%", marginTop: "10px", color:'rgb(187 232 25)'}}>
                            {game.price > 0 ? `$${game.price}` : 'Free'}
                        </div>
                    </div>
                    // </NavLink>
                ))}
            </div>
        </>
    )
}

export default AllGames
