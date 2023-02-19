import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { update_game } from "../../store/games"


function EditGameForm() {
    const game = useSelector(state => state.games.singleGame)
    const [previewUrl, setPreviewUrl] = useState(game.cover)
    const [title, setTitle] = useState(game.title)
    const [price, setPrice] = useState(game.price)
    const [description, setDescription] = useState(game.description)
    const [about, setAbout] = useState(game.about)
    const [rating, setRating] = useState(game.rating)

    const systems = ['Windows', 'MacOS', 'VaporOS + Linux']
    const [selectedSystems, setSelectedSystems] = useState(game.systems)

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState(game.genres)

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    // console.log('game', game)



    //on load, grab list of available genres
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/games/genres');
            const data = await response.json();

            setGenres(data.Genres);
        })();
    }, []);


    //send updated game info and check for response errors
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const updatedGame = {
            title,
            price,
            description,
            about,
            rating,
            systems: selectedSystems,
            genres: selectedGenres,
            previewUrl
        }

        await dispatch(update_game(game.id, updatedGame))
            .then(closeModal)
            .catch(async errs => {

                if (errs) setErrors(errs);
            })
    }

    //helper function to change selected systems if checkbox is checked
    const systemSelected = (e, syst) => {
        if (e.target.checked) {
            setSelectedSystems([...selectedSystems, syst])

        } else {
            setSelectedSystems(selectedSystems.filter(system => system !== syst))
        }
    }

    //helper function to change selected genres if checkbox is checked
    const genreSelected = (e, gen) => {
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, gen])

        } else {
            setSelectedGenres(selectedGenres.filter(genre => genre !== gen))
        }
    }

    //helper component to render checkboxes for each system
    const systemComponents = systems.map(system => (
        selectedSystems.includes(system)
            ?
            <React.Fragment key={system}>
                <label >
                    <input
                        type="checkbox"
                        id={system}
                        name={system}
                        value={system}
                        onChange={(e) => systemSelected(e, system)}
                        style={{ cursor: 'pointer' }}
                        checked
                    />
                    {system}
                </label>
                <br />
            </React.Fragment>
            :
            <React.Fragment key={system}>
                <label >
                    <input
                        type="checkbox"
                        id={system}
                        name={system}
                        value={system}
                        onChange={(e) => systemSelected(e, system)}
                        style={{ cursor: 'pointer' }}
                    />
                    {system}
                </label>
                <br />
            </React.Fragment>
    ))

    //helper component to render checkboxes for each genre
    const genreComponents = genres.map(genre => (
        selectedGenres.includes(genre)
            ?
            <React.Fragment key={genre}>
                <label >
                    <input
                        type="checkbox"
                        id={genre}
                        name={genre}
                        value={genre}
                        onChange={(e) => genreSelected(e, genre)}
                        style={{ cursor: 'pointer' }}
                        checked
                    />
                    {genre}
                </label>
                <br />
            </React.Fragment >
            :
            <React.Fragment key={genre}>
                <label >
                    <input
                        type="checkbox"
                        id={genre}
                        name={genre}
                        value={genre}
                        onChange={(e) => genreSelected(e, genre)}
                        style={{ cursor: 'pointer' }}
                    />
                    {genre}
                </label>
                <br />
            </React.Fragment >
    ))

    const disabled = errors.length ||
        !previewUrl ||
        !title ||
        !description ||
        !about ||
        !selectedSystems.length ||
        !selectedGenres.length ||
        !rating ? true : false

    return (
        <div className="form-container">
            <div className="modal-header">
                <h1>Update Your Game</h1>
            </div>
            <div className="modal-body-container">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='spot-form flex-column'>
                    <ul>
                        {errors.map((error, idx) => (
                            <li style={{ color: 'red' }} key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">Cover Image:</strong>
                            <p style={{ visibility: !previewUrl ? 'visible' : 'hidden' }}
                                className="form-input-error">Required</p>
                        </div>
                        <br />
                        <input
                            className="modal-top-input"
                            type="url"
                            placeholder="Cover Image URL"
                            value={previewUrl}
                            onChange={(e) => setPreviewUrl(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">Title:</strong>
                            <p style={{ visibility: !title ? 'visible' : 'hidden' }}
                                className="form-input-error">Required</p>
                        </div>
                        <br />
                        <input
                            className="modal-top-input"
                            type="text"
                            minLength={1}
                            maxLength={200}
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label" style={{width: '100%'}}>
                        Price:
                        <br />
                        <div>
                            <strong className="">$</strong>
                            <input
                                className="modal-bottom-input form-input-type"
                                type="number"
                                step={0.01}
                                min={0}
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">Description:</strong>
                            <p style={{ visibility: !description ? 'visible' : 'hidden' }}
                                className="form-input-error">Required</p>
                        </div>
                        <br />
                        <input
                            className="modal-input description"
                            type="text"
                            minLength={1}
                            maxLength={300}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">ESRB Rating:</strong>
                            <p style={{ visibility: !rating ? 'visible' : 'hidden' }}
                                className="form-input-error">Select a Rating</p>
                        </div>
                        <br />
                        <select
                            className="modal-input"
                            type="select"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            <option value=""></option>
                            <option value="E">Everyone (E)</option>
                            <option value="T">Teen (T)</option>
                            <option value="M">Mature (M)</option>
                        </select>
                    </label>
                    <br />
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">About this game:</strong>
                            <p style={{ visibility: !about ? 'visible' : 'hidden' }}
                                className="form-input-error">Required</p>
                        </div>
                        <br />
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">Systems:</strong>
                            <p style={{ visibility: !selectedSystems.length ? 'visible' : 'hidden' }}
                                className="form-input-error">At least 1 Required</p>
                        </div>
                        <fieldset>
                            {systemComponents}
                        </fieldset>
                    </label>
                    <label className="modal-label">
                        <div>
                            <strong className="form-input-type">Genres:</strong>
                            <p style={{ visibility: !selectedGenres.length ? 'visible' : 'hidden' }}
                                className="form-input-error">At least 1 Required</p>
                        </div>
                        <fieldset>
                            {genreComponents}
                        </fieldset>
                    </label>
                    <button
                        className={disabled ? "submit-button disabled" : "submit-button"}
                        type="submit"
                        disabled={disabled}
                    >Update</button>
                </form>
            </div>
        </div >
    )
}

export default EditGameForm
