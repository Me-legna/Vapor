import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { delete_game } from "../../store/games";

function DeleteGameForm() {
    const game = useSelector(state => state.games.singleGame)
    const [checked, setChecked] = useState()
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(delete_game(game.id))
            .then(() => {
                history.push('/store')
                closeModal()
            })
            .catch(
                async (errs) => {

                    if (errs) setErrors(errs);
                }
            );

    };

    return (
        <>
            <div className="modal-header">
                <h1>Are you sure you want to delete this server?</h1>
            </div>
            <div className="modal-body-container">

                <form onSubmit={handleSubmit} className='modal-body'>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div>
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
                    {checked && (<button type="submit" className="submit-spot clickable" disabled={!checked}>Delete Game</button>)}
                </form>
            </div>
        </>
    )
}

export default DeleteGameForm
