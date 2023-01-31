import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { create_game } from "../../store/games"


function CreateGameForm() {
    const user = useSelector(state => state.session.user)
    const today = new Date().toISOString().split('T')[0]
    const [previewUrl, setPreviewUrl] = useState('https://www.brawlhalla.com/c/uploads/2022/05/BHxSF-Trailer-Thumb.png')
    const [title, setTitle] = useState('')
    const [inputDate, setInputDate] = useState(today)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')


    const systems = ['Windows', 'MacOS', 'VaporOS + Linux']
    const [selectedSystems, setSelectedSystems] = useState([])

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    console.log('selectedSystems', selectedSystems)
    console.log('selectedGenres', selectedGenres)
    console.log('rating', rating)


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

        const releaseDate = inputDate.split('-').map(str => +str)

        const newGame = {
            title,
            release_date: releaseDate,
            price,
            description,
            rating,
            systems: selectedSystems,
            genres: selectedGenres
        }

        await dispatch(create_game(newGame))
            .then(game => history.push(`/games/${game.id}`))
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
                <h1>Add Your Game</h1>
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
                            type="url"
                            placeholder="Preview Image Url"
                            value={previewUrl}
                            onChange={(e) => setPreviewUrl(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label">
                        Title:
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
                        Release Date:
                        <input
                            className="modal-top-input"
                            type="date"
                            min="1997-06-30"
                            max={today}
                            placeholder="Title"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                            required
                        />
                    </label>
                    <label className="modal-label">
                        Price:
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
                        Description:
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
                        ESRB Rating:
                        <select
                            className="modal-input"
                            type="select"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            <option value="">Select a Rating</option>
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
                        <br />
                        {genreComponents}
                    </fieldset>
                    <button
                        type="submit"
                        disabled={
                            errors.length ||
                            !selectedSystems.length ||
                            !selectedGenres.length ||
                            !rating
                        }
                    >Add Game</button>
                </form>
            </div>
        </>
    )
}

export default CreateGameForm
