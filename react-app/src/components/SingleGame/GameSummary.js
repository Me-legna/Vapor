import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import vaporLogo from "../../images/vapor-icon.png";
import "./SingleGame.css";
import MediaShowcase from "./MediaShowcase";

function GameSummary() {
	const singleGame = useSelector((state) => state.games.singleGame);

	return (
		<div className="right-col">
			<Card>
				<Card.Img className="" alt="game-cover-image" src={singleGame.cover} />
			</Card>
		</div>
		// <Container className="d-flex m-0 p-0">
		// <div className="media-comp-container">
		// 	<div className="media-left-container">
		// 		<figure className="showcase-img-container">
		// 			<img
		// 				className="showcase-img"
		// 				src={selectedMedia}
		// 				onError={addDefaultSrc}
		// 				alt="selected-media"
		// 			></img>
		// 		</figure>
		// 		<div>
		// 			{singleGame.media?.map((media, idx) => (
		// 				<img
		// 					className="small-media"
		// 					key={media?.id}
		// 					src={media?.url}
		// 					onError={addDefaultSrc}
		// 					alt={`${singleGame.title} #${idx + 1}`}
		// 					onClick={() => setSelectedMedia(media?.url)}
		// 				/>
		// 			))}
		// 		</div>
		// 	</div>
		// 	<div className="media-right-container">
		// 		<img
		// 			className="cover-img"
		// 			src={singleGame.cover}
		// 			onError={addDefaultSrc}
		// 			alt="game-preview"
		// 		></img>
		// 		<p className="discription-p">{singleGame.description}</p>
		// 		<table>
		// 			<tbody>
		// 				<tr>
		// 					<th>RATING:</th>
		// 					<td>{singleGame.rating}</td>
		// 					{/* <th>REVIEWS:</th>
		//                     <td>Positive?</td> */}
		// 				</tr>
		// 				<tr>
		// 					<th>RELEASE DATE:</th>
		// 					<td>{singleGame.release_date}</td>
		// 				</tr>
		// 				<tr>
		// 					<th>DEVELOPER:</th>
		// 					<td>
		// 						{singleGame.developer
		// 							? singleGame.developer
		// 							: "Anonymous Studios"}
		// 					</td>
		// 				</tr>
		// 			</tbody>
		// 		</table>
		// 	</div>
		// </div>
		// </Container>
	);
}

export default GameSummary;
