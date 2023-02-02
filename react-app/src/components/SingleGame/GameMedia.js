import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import './SingleGame.css'

function GameMedia() {
    const singleGame = useSelector(state => state.games.singleGame)
    const previewImage = singleGame.media?.find(img => img.is_preview === true)
    const [selectedMedia, setSelectedMedia] = useState()

    useEffect(() => {
        setSelectedMedia(singleGame.media?.[0].url)
    }, [singleGame])

    return (
        <div className="media-comp-container">
            <div className="media-left-container">
                <figure className="showcase-img-container">
                    <img className="showcase-img" src={selectedMedia} alt='selected-media'></img>
                </figure>
                <div>
                    {singleGame.media?.map((media, idx) => (
                        <img
                            className="small-media"
                            key={media.id}
                            src={media.url}
                            alt={`${singleGame.title} #${idx + 1}`}
                            onClick={() => setSelectedMedia(media.url)}
                        />
                    ))}
                </div>
            </div>
            <div className="media-right-container">
                <img className="cover-img" src={previewImage?.url} alt='game-preview'></img>
                <p className="discription-p">
                    {singleGame.description}
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>REVIEWS:</th>
                            <td>Positive?</td>
                        </tr>
                        <tr>
                            <th>RELEASE DATE:</th>
                            <td>{singleGame.release_date}</td>
                        </tr>
                        <tr>
                            <th>DEVELOPER:</th>
                            <td>{singleGame.developer ? singleGame.developer : 'Anonymous Studios'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default GameMedia
