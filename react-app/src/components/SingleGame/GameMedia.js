import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


function GameMedia() {
    const singleGame = useSelector(state => state.games.singleGame)
    const previewImage = singleGame.media?.find(img => img.is_preview === true)
    const [selectedMedia, setSelectedMedia] = useState()

    useEffect(() => {
        setSelectedMedia(singleGame.media?.[0].url)
    }, [singleGame])

    return (
        <>
            <h1>GameMedia</h1>
            <figure>
                <img src={selectedMedia} alt='selected-media'></img>
            </figure>
            <section>
                <div>
                    {singleGame.media?.map((media, idx) => (
                        <img
                            key={media.id}
                            src={media.url}
                            alt={`${singleGame.title} #${idx + 1}`}
                            onClick={() => setSelectedMedia(media.url)}
                        />
                    ))}
                </div>
                <div>
                    <img src={previewImage?.url} alt='game-preview'></img>
                    <p>
                        {singleGame.description}
                    </p>
                    <table>
                        <tbody>
                            <tr>
                                <th>Reviews:</th>
                                <td>Positive?</td>
                            </tr>
                            <tr>
                                <th>Release Date:</th>
                                <td>{singleGame.release_date}</td>
                            </tr>
                            <tr>
                                <th>Developer:</th>
                                <td>{singleGame.developer ? singleGame.developer : 'Anonymous Studios'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div>
               <button>Wishlist?</button>
            </div>
        </>

    )
}

export default GameMedia
