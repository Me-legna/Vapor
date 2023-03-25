import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import vaporLogo from "../../images/vapor-icon.png";
import "./SingleGame.css";
import MediaShowcase from "./MediaShowcase";

function GameSummary() {
	const singleGame = useSelector((state) => state.games.singleGame);
	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};

	return (
		<div className="right-col">
			<div className="game-cover-img-ctn">
				<Image
					className="game-cover-img"
					src={singleGame.cover}
					alt={`${singleGame.title} cover`}
					onError={addDefaultSrc}
				/>
			</div>
			<p className="description-ctn">
				{singleGame.description}
				
			</p>
			<div className="game-table-ctn">
				<Table borderless className="game-detail-table">
					<tbody>
						<tr>
							{/* <th>REVIEWS:</th>
							<td>Positive?</td> */}
						</tr>
						<tr>
							<th>RATING:</th>
							<td>{singleGame.rating}</td>
						</tr>
						<tr>
							<th>RELEASE DATE:</th>
							<td>{singleGame.release_date}</td>
						</tr>
						<br/>
						<tr>
							<th>DEVELOPER:</th>
							<td>
								{singleGame.developer
									? singleGame.developer
									: "Anonymous Studios"}
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
			<div></div>
		</div>
	);
}

export default GameSummary;
