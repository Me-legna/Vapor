import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { delete_game } from "../../store/games";

function DeleteGameForm() {
    const game = useSelector(state => state.games.singleGame)
    const [checked, setChecked] = useState(false)
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(delete_game(game.id))
        closeModal()
        history.push('/store')


    };

    return (
        <>
            <div className="delete-modal-header">
                <h1>Are you sure you want to delete this game?</h1>
            </div>
            <div className="delete-modal-body-container">

                <form onSubmit={handleSubmit} className='delete-form'>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div style={{marginBottom:'4%'}}>
                        <label>
                            No
                            <input
                                type="radio"
                                name="choice-radio"
                                className="clickable"
                                onChange={(e) => setChecked(false)}
                                checked={checked ? false : true}
                            />
                        </label>
                        <label>
                            Yes
                            <input
                                type="radio"
                                name="choice-radio"
                                className="clickable"
                                onChange={(e) => setChecked(true)}
                                checked={checked}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={!checked ? "submit-button disabled" : "submit-button"}
                        disabled={!checked}
                    >Delete Game</button>
                </form>
            </div>
        </>
    )
}

export default DeleteGameForm
