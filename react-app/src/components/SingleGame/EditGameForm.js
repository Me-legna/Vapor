import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { update_game } from "../../store/games"


function EditGameForm() {
    const game = useSelector(state => state.games.singleGame)
    const [title, setTitle] = useState(game.title)
    const [price, setPrice] = useState(game.price)
    const [description, setDescription] = useState(game.description)
    const [rating, setRating] = useState(game.rating)
    const systems = ['Windows', 'MacOS', 'VaporOS + Linux']
    const [selectedSystems, setSelectedSystems] = useState(game.systems)
    const [numSelectedSystems, setNumSelectedSystems] = useState(game.systems.length)
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState(game.genres)
    const [numSelectedGenres, setNumSelectedGenres] = useState(game.genres.length)
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    console.log('game', game)
    console.log('numSelectedGenres', numSelectedGenres)
    console.log('numSelectedSystems', numSelectedSystems)


    //send updated game info and check for response errors
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const updatedGame = {
            title,
            price,
            description,
            rating,
            systems: selectedSystems,
            genres: selectedGenres
        }

        await dispatch(update_game(game.id, updatedGame))
            .then(closeModal)
            .catch(async errs => {

                if (errs) setErrors(errs);
            })
    }

    //disable submit button helper
    const disabled = () => {
        if (errors.length) return true
        if (!selectedSystems.length) return true
        if (!selectedGenres.length) return true
    }

    //on load, grab list of available genres
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/games/genres');
            const data = await response.json();

            setGenres(data.Genres);
        })();
    }, []);

    //helper function to change selected systems if checkbox is checked
    function systemSelected(e, syst) {
        if (e.target.checked) {
            selectedSystems.push(syst)
            setNumSelectedSystems(numSelectedSystems + 1)

        } else {
            setSelectedSystems(selectedSystems.filter(system => system !== syst))
            setNumSelectedSystems(numSelectedSystems - 1)
        }
    }

    //helper function to change selected genres if checkbox is checked
    function genreSelected(e, gen) {
        if (e.target.checked) {
            selectedGenres.push(gen)
            setNumSelectedGenres(numSelectedGenres + 1)

        } else {
            setSelectedGenres(selectedGenres.filter(genre => genre !== gen))
            setNumSelectedGenres(numSelectedGenres - 1)
        }
    }

    //helper component to render checkboxes for each system
    const systemComponents = systems.map(system => (
        selectedSystems.includes(system)
            ?
            <>
                <label key={system}>
                    {system}
                    <input
                        type="checkbox"
                        id={system}
                        name={system}
                        value={system}
                        onChange={(e) => systemSelected(e, system)}
                        style={{ cursor: 'pointer' }}
                        checked
                    />
                </label>
                <br />
            </>
            :
            <>
                <label key={system}>
                    {system}
                    <input
                        type="checkbox"
                        id={system}
                        name={system}
                        value={system}
                        onChange={(e) => systemSelected(e, system)}
                        style={{ cursor: 'pointer' }}
                    />
                </label>
                <br />
            </>
    ))

    //helper component to render checkboxes for each genre
    const genreComponents = genres.map(genre => (
        selectedGenres.includes(genre)
            ?
            <>
                <label key={genre}>
                    {genre}
                    <input
                        type="checkbox"
                        id={genre}
                        name={genre}
                        value={genre}
                        onChange={(e) => genreSelected(e, genre)}
                        style={{ cursor: 'pointer' }}
                        checked
                    />
                </label>
                <br />
            </>
            :
            <>
                <label key={genre}>
                    {genre}
                    <input
                        type="checkbox"
                        id={genre}
                        name={genre}
                        value={genre}
                        onChange={(e) => genreSelected(e, genre)}
                        style={{ cursor: 'pointer' }}
                    />
                </label>
                <br />
            </>
    ))

    return (
        <>
            <div className="modal-header">
                <h1>Edit Game Details</h1>
            </div>
            <div className="modal-body-container">
                <form onSubmit={handleSubmit} className='spot-form flex-column'>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label className="modal-label">
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
                    <label className="modal-label">
                        <input
                            className="modal-bottom-input"
                            type="number"
                            step={0.01}
                            min={0}
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label">
                        <input
                            className="modal-input"
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
                        <select
                            className="modal-input"
                            type="select"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            <option value="E">Everyone</option>
                            <option value="T">Teen</option>
                            <option value="M">Mature</option>
                        </select>
                    </label>
                    <fieldset>
                        Systems:
                        <br />
                        {systemComponents}
                    </fieldset>
                    <fieldset>
                        Genres:
                        <br/>
                        {genreComponents}
                    </fieldset>
                    <button
                        type="submit"
                        disabled={
                            errors.length ||
                            !selectedSystems.length ||
                            !selectedGenres.length
                        }
                    >Update Game Details</button>
                </form>
            </div>
        </>
    )
}

export default EditGameForm
