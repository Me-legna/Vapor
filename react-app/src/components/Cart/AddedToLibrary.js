import { useSelector } from "react-redux"

function AddedToLibrary() {
    const singleGame = useSelector(state => state.games.singleGame)
    return (
        <div>
            <h1>{singleGame.title}</h1>
            <p>{singleGame.title} has been added to your account. It is now available in your Vapor Library.</p>
        </div>

    )
}

export default AddedToLibrary
