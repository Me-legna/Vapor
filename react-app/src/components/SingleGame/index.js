import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { load_one_game } from "../../store/games";
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import DeleteGameForm from "./DeleteGameForm";
import EditGameForm from "./EditGameForm";
import GameBody from "./GameBody";
import GameHeader from "./GameHeader";
import GameSummary from "./GameSummary";
import MediaShowcase from "./MediaShowcase";
import GameReviews from "./GameReviews";
import "./SingleGame.css";

function SingleGame() {
	const user = useSelector((state) => state.session.user);
	const game = useSelector((state) => state.games.singleGame);
	// const [loaded, setLoaded] = useState(false)
	const dispatch = useDispatch();
	const history = useHistory();
	const { gameId } = useParams();

	useEffect(() => {
		dispatch(load_one_game(gameId));
		if (!user) {
			dispatch(authenticate());
		}
		// if (!Object.keys(game).length) {
		//     if (gameId) {
		//     }
		// }
		// setLoaded(true)
	}, [dispatch, history, user, gameId]);

	// if(!loaded) return null

	return (
		Object.keys(game).length && (
			// <h1>SingleGame</h1>

			<>
				<GameHeader />
				<section className="d-flex p-0 media-ctn">
					<MediaShowcase />
					<GameSummary />
				</section>
				<section className="body-ctn">
					<GameBody />
				</section>
			</>

			// 		{/* <section>
			//     <GameReviews/>
			// </section> */}

			// <section>
			//     <header className='single-header'>
			//         <div className='single-header-left'>
			//         <p>AllGames {`> ${game.title ? `${game.genres[0]} > ${game.title}` : ''}`}</p>
			//         <h1>{game.title}</h1>
			//         </div>
			//         <div style={{ width: "10%", paddingTop: '2%' }}>
			//             {user && user.id === game.developer_id && (
			//                 <div>
			//                     <OpenModalButton
			//                         modalComponent={<EditGameForm />}
			//                         faIcon={<i className="fa-solid fa-pen-to-square"></i>}
			//                     />
			//                     <br />
			//                     <OpenModalButton
			//                         modalComponent={<DeleteGameForm />}
			//                         faIcon={<i className="fa-solid fa-trash-can"></i>}
			//                     />
			//                 </div>
			//             )}
			//         </div>
			//     </header>
			//     <section>
			//         <GameMedia />
			//     </section>
			//     <section>
			//         <GameBody />
			//     </section>
			//     {/* <section>
			//         <GameReviews/>
			//     </section> */}
			// </section>
		)
	);
}

export default SingleGame;
