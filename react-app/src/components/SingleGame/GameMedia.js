import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import FigureImage from "react-bootstrap/FigureImage";
import Image from "react-bootstrap/Image";
import vaporLogo from "../../images/vapor-icon.png";
import "./SingleGame.css";

function GameMedia() {
	const singleGame = useSelector((state) => state.games.singleGame);
	const mediaList = useSelector((state) => state.games.singleGame.media);
	const [isVideo, setIsVideo] = useState(mediaList.length ? mediaList[0].is_video : false)
	const [selectedMedia, setSelectedMedia] = useState(
		mediaList.length ? mediaList[0].url : vaporLogo
	);

	// useEffect(() => {
	// 	setSelectedMedia(singleGame.cover);
	// }, [singleGame]);

	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};

	return (
		<div className="d-flex p-0 media-ctn">
			<div className="left-col">
				<div className="showcase-ctn">
					<div className="showcase-overflow">
						{isVideo ? (
							<FigureImage
								alt="171x180"
								src={selectedMedia}
								className="showcase-img-ctn"
							/>
						) : (
							<iframe
								src={`https://www.youtube.com/embed/qAUwCe_8DXE`}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="showcase-img-ctn"
								title="Embedded youtube"
							/>
						)}
						<div className="showcase-reel">
							{/* {mediaList &&
								mediaList.map((media) =>
									media.is_video ? (
										<iframe
											src={`https://www.youtube.com/embed/${media.url}`}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											title="Embedded youtube"
										/>
									) : (
										<Image></Image>
									)
								)} */}
						</div>
						<div className="mt-1 showcase-slider"></div>
					</div>
				</div>
			</div>
			<div className="right-col">
				<Card>
					<Card.Img
						className=""
						alt="game-cover-image"
						src={singleGame.cover}
					/>
				</Card>
			</div>
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
