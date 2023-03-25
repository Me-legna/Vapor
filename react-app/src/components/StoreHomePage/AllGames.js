import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { load_all_games, load_one_game } from "../../store/games";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../images/vapor-icon.png";
import "./HomePage.css";

function AllGames() {
	const allGamesObj = useSelector((state) => state.games.allGames.byId);
	const allGamesArr = Object.values(allGamesObj);
	const dispatch = useDispatch();
	const history = useHistory();
	// console.log(allGamesArr)

	useEffect(() => {
		dispatch(load_all_games());
	}, [dispatch]);

	async function handleClick(gameId) {
		await dispatch(load_one_game(gameId)).then(() =>
			history.push(`/games/${gameId}`)
		);
	}
	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = logo;
	};

	return (
		!!allGamesArr.length && (
			<Container className="text-white justify-content-center games-list-ctn">
				{allGamesArr.map((game) => (
					<div
						// style={{ backgroundColor: "#445468", width: "100%" }}
						key={game.id + game.title}
						className="mt-2 align-items-center indiv-game library-item-list"
						// onClick={() => handleShow(item.game.id)}
					>
						<div
							className="library-list-image-container"
							onClick={() => handleClick(game.id)}
						>
							<img
								className="library-list-image p-1"
								src={game.cover}
								onError={addDefaultSrc}
								alt="game-img"
							></img>
							{/* <div class="p-1 overlay">View store page</div> */}
							<div class="p-1 overlay">
								<div class="hover-text">View store page</div>
							</div>
						</div>
						<div className="p-3 align-center game-list-info-container">
							<Container>
								<Row>
									<h4 style={{ paddingLeft: "0px" }}>{game.title}</h4>
								</Row>
								<Row className="p-0 row-bottom" style={{ color: "#b8bcbf" }}>
									<div className="d-flex align-items-center    ">
										{game.systems.map((system, idx) =>
											system === "Windows" ? (
												<i
													key={`${idx}`}
													className="system-icon fa-brands fa-windows"
												></i>
											) : system === "MacOS" ? (
												<i
													key={`${idx}`}
													className="system-icon fa-brands fa-apple"
												></i>
											) : (
												<img
													key={`${idx}`}
													src={logo}
													alt="logo"
													className="system-icon logo"
												></img>
											)
										)}
									</div>
								</Row>
							</Container>
						</div>
					</div>
				))}
			</Container>
			// <div className="games-list-container">
			// 	<div>
			// 		{allGamesArr.map((game) => (
			// 			// <NavLink className='indiv-game-nav' key={game.title} to={`/games/${game.id}`}>
			// 			<div
			// 				key={game.id}
			// 				className="indiv-game clickable"
			// 				onClick={() => history.push(`/games/${game.id}`)}
			// 			>
			// 				{/* {console.log('game', game)} */}
			// 				<div className="game-list-image-container">
			// 					<img
			// 						className="p-1 game-list-image"
			// 						src={game.cover}
			// 						onError={addDefaultSrc}
			// 						alt="game-img"
			// 					></img>
			// 				</div>
			// 				<div className="game-list-info-container">
			// 					<div className="game-list-left-info">
			// 						<div className="game-list-title">{game.title}</div>
			// 						<div className="system-icon-container">
			// 							{game.systems.map((system, idx) =>
			// 								system === "Windows" ? (
			// 									<i
			// 										key={`${idx}`}
			// 										className="system-icon fa-brands fa-windows"
			// 									></i>
			// 								) : system === "MacOS" ? (
			// 									<i
			// 										key={`${idx}`}
			// 										className="system-icon fa-brands fa-apple"
			// 									></i>
			// 								) : (
			// 									<img
			// 										key={`${idx}`}
			// 										src={logo}
			// 										alt="logo"
			// 										className="system-icon logo"
			// 									></img>
			// 								)
			// 							)}
			// 						</div>
			// 						<div
			// 							style={{
			// 								padding: "5px 10px 5px 10px",
			// 								fontSize: "15px",
			// 								color: "grey",
			// 							}}
			// 						>
			// 							{game.genres.map((genre, idx) =>
			// 								idx === 0 ? (
			// 									<React.Fragment key={`${idx}`}>
			// 										{genre}
			// 									</React.Fragment>
			// 								) : (
			// 									<React.Fragment
			// 										key={`${idx}`}
			// 									>{`, ${genre}`}</React.Fragment>
			// 								)
			// 							)}
			// 						</div>
			// 					</div>
			// 					<div
			// 						style={{
			// 							marginLeft: "40%",
			// 							marginTop: "10px",
			// 							color: "rgb(187 232 25)",
			// 						}}
			// 					>
			// 						{game.price > 0 ? `$${game.price}` : "Free"}
			// 					</div>
			// 				</div>
			// 			</div>
			// 			// </NavLink>
			// 		))}
			// 	</div>
			// </div>
		)
	);
}

export default AllGames;
