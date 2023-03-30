import { useHistory } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import vaporLogo from "../../images/vapor-icon.png";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect } from "react";
import { authenticate } from "../../store/session";
import { load_one_game } from "../../store/games";

function OwnedGames() {
	const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};

	const monthsAbbreviations = [
        "",
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
    const random100 = () => Math.ceil(Math.random() * 100);
	const randomMax = (max) => Math.ceil(Math.random() * max);
    async function handleClick(gameId) {
			await dispatch(load_one_game(gameId)).then(() =>
				history.push(`/games/${gameId}`)
			);
		}

	return (
		<div className="mt-4 align-baseline" style={{ color: "#5eafde" }}>
			{/* <h4>What issue are you having with this purchase?</h4> */}
			<div>
				{user.games_owned?.map((item) => {
					const achievements = random100();
					const monthIndex = randomMax(12);
					const month = monthsAbbreviations[monthIndex];
					const day = monthIndex === 1 ? randomMax(28) : randomMax(30);
					const fullDate = `${month} ${day}, 2022`;

					return (
						<div
							// style={{ backgroundColor: "#445468", width: "100%" }}
							key={item.id + item.title}
							className="mt-2 align-items-center indiv-item library-item-list"
							// onClick={() => handleShow(item.game.id)}
						>
							<div
								className="library-list-image-container"
								onClick={() => handleClick(item.id)}
							>
								<img
									className="library-list-image p-1"
									src={item.cover}
									onError={addDefaultSrc}
									alt="game-img"
								></img>
								{/* <div class="p-1 overlay">View store page</div> */}
								<div className="p-1 overlay">
									<div className="hover-text">View store page</div>
								</div>
							</div>
							<div className="p-3 align-center game-list-info-container">
								<Container>
									<Row>
										<h4 style={{ paddingLeft: "0px" }}>{item.title}</h4>
									</Row>
									<Row className="p-0 row-bottom" style={{ color: "#b8bcbf" }}>
										<Col>
											<Row>Total Played</Row>
											<Row>{random100()} Hours</Row>
										</Col>
										<Col>
											<Row>Last Played</Row>
											<Row>{fullDate}</Row>
										</Col>
										<Col className="p-0">
											<div className="flex-between">
												<p>Achievements</p>
												<p>{achievements}/100</p>
											</div>
											<ProgressBar min={0} max={100} now={achievements} />
										</Col>
									</Row>
								</Container>
								{/* <Table >
								<thead>
									<tr>
										<td>{item.title}</td>
                                        <td></td>
                                        <td></td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style={{maxWidth:''}}>Total Played</td>
										<td>Last Played</td>
										<td className="flex-between">
											<p>Achievements</p>
											<p>0/100</p>
										</td>
									</tr>
									<tr>
										<td>0 Hours</td>
										<td>Never</td>
										<td>0 Hours</td>
									</tr>
								</tbody>
							</Table> */}
								{/* {`${item.title}`}
                            <p>0 hours on record</p> */}
							</div>
							{/* <i className="fa-sharp fa-solid fa-play m-4"></i> */}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OwnedGames;
