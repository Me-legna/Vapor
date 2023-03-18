import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import vaporLogo from "../../images/vapor-icon.png";
import "./SingleGame.css";

function GameMedia() {
	const singleGame = useSelector((state) => state.games.singleGame);
	const media = useSelector((state) => state.games.singleGame.media);
	const [selectedMedia, setSelectedMedia] = useState(
		media.length ? singleGame.media[0].url : vaporLogo
	);

	// useEffect(() => {
	// 	setSelectedMedia(singleGame.cover);
	// }, [singleGame]);

	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};

	return (
		<div className="d-flex p-0">
			<div>
				<Figure className="showcase-img-container">
				{/* <Figure style={{ height: "80%", minWidth: "100%", paddingRight: "2%" }}> */}
					<Figure.Image
						style={{ height: "100%", width: "100%" }}
						src={selectedMedia}
						alt="selected-media"
					/>
				</Figure>
				<Carousel slide>
					{/* {singleGame.media?.map((media, idx) => (
						<Carousel.Item
							key={idx}
							onClick={() => setSelectedMedia(media.url)}
						>
							<Image
								className="d-block w-50"
								alt="carousel-item"
								onError={addDefaultSrc}
								height={50}
								width={50}
								src={media.url}
							/>
						</Carousel.Item>
					))} */}
				</Carousel>
			</div>
			<Card style={{ minWidth: "30%", maxWidth: "30%" }}>
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

export default GameMedia;
