import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { load_all_games, load_one_game } from "../../store/games";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../images/vapor-icon.png";
import Image from "react-bootstrap/Image";
import "./HomePage.css";
import SystemIcons from "../SystemIcons";
import GenresList from "../GenresList";
import Table from "react-bootstrap/esm/Table";

function AllGames() {
	const allGamesObj = useSelector((state) => state.games.allGames.byId);
	const allGamesArr = Object.values(allGamesObj);
	const [isHovering, setIsHovering] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

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
			<div className="d-flex">
				<div className="text-white games-list-ctn">
					{allGamesArr.map((game) => (
						<div
							onMouseEnter={() => setIsHovering(game.id)}
							key={game.id + game.title}
							style={{
								backgroundColor:
									isHovering === game.id ? "#09a9edcc" : "#445468",
								paddingRight: isHovering === game.id ? "3%" : "",
								width: isHovering === game.id ? "103%" : "100%",
							}}
							className="mt-2 align-items-center indiv-game"
							onClick={() => history.push(`/games/${game.id}`)}
						>
							<div
								className="game-list-img-ctn"
								onClick={() => handleClick(game.id)}
							>
								<img
									className="library-list-image p-1"
									src={game.cover}
									onError={addDefaultSrc}
									alt="game-img"
								></img>
								{/* <div class="p-1 overlay">View store page</div> */}
								<div className="p-1 overlay">
									<div className="hover-text">View store page</div>
								</div>
							</div>
							<div className="game-info-price-ctn">
								<Container className="game-info">
									<Row>
										<h4
											style={{
												color: isHovering === game.id ? "#232323fc" : "white",
											}}
										>
											{game.title}
										</h4>
									</Row>
									<Row className="p-0">
										<div
											style={{
												color: isHovering === game.id ? "#232323fc" : "#b7b7b7",
											}}
											className="d-flex align-items-center p-0"
										>
											<SystemIcons systems={game.systems} />
										</div>
									</Row>
									<Row>
										<div
											style={{
												color: isHovering === game.id ? "#232323fc" : "#b7b7b7",
											}}
											className="genres-ctn"
										>
											<GenresList genres={game.genres} />
										</div>
									</Row>
								</Container>
								<div
									style={{
										color: isHovering === game.id ? "#232323fc" : "white",
									}}
								>
									{game.price > 0 ? `$${game.price}` : "Free"}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="pb-2 preview-section">
					<div className="mt-2 preview-ctn">
							{allGamesArr.map(game => (
								<div style={{display: isHovering === game.id ? 'flex' : 'none'}} className="preview-item">
									<h2>{game.title}</h2>
									<Container className="reviews-preview">
										{/* <Row>Overall User Reviews:</Row>
										<Row>Very Positive(numReviews)</Row> */}
									</Container>
									<Container className="preview-genres">
										{/* <GenresList genres={game.genres}/> */}
									</Container>
									<Container className="preview-images-list-ctn">
									{game.media.filter(media => media.is_video === false).map(media => (
										<div className="preview-image-ctn">
											<Image className="library-list-image" src={media.url}/>
										</div>
									))}
									</Container>
								</div>
							))}
					</div>
				</div>
			</div>
		)
	);
}

export default AllGames;
