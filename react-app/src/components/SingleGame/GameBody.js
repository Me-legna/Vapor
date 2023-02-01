// import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import './SingleGame.css'

function GameBody() {
    const singleGame = useSelector(state => state.games.singleGame)
    // const [genre, setGenre] = useState({})

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch('/api/games/genres/', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({})
    //         });
    //         const data = await response.json();

    //         setGenre(data.Genre);
    //     })();
    // })

    return (
        <div className="game-body-comp-container">
            <div className="game-body-left">
                <div>
                    {/* game === Free ? Add to Library : Add to Cart*/}
                </div>
                <div>
                    <h2>ABOUT THIS GAME</h2>
                    {singleGame.about}
                </div>
                {/* <div>
                        <h2>MATURE CONTENT DESCRIPTION</h2>
                    </div> */}
                <div>
                    <h2>SYSTEM AVAILABILITY</h2>
                    <div>
                        {singleGame.systems.map((system, idx) => (
                            <div key={system + idx}>{system}</div>
                        ))}
                    </div>
                </div>
                {/* <div>
                        <h2>MORE LIKE THIS</h2>
                        <div>
                            genre.games?
                        </div>
                    </div> */}
            </div>
            {/* <div className="game-body-right">

                </div> */}
        </div>
    )
}

export default GameBody
