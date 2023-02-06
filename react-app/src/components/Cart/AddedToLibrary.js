import { useSelector } from "react-redux"
import { useModal } from "../../context/Modal"

function AddedToLibrary() {
    const singleGame = useSelector(state => state.games.singleGame)
    const { closeModal } = useModal()

    const okay = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div>
            <h1>{singleGame.title}</h1>
            <p>{singleGame.title} has been added to your account. It is now available in your Vapor Library.</p>
            <button onClick={okay} className="submit-button clickable">Okay</button>
        </div>

    )
}

export default AddedToLibrary
