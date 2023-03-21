import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";
import Image from "react-bootstrap/Image";
import vaporLogo from "../../images/vapor-icon.png";
import "./SingleGame.css";

function GameMedia() {
	const singleGame = useSelector((state) => state.games.singleGame);
	const mediaArr = useSelector((state) => state.games.singleGame.media);
	const mediaList = mediaArr.sort((a,b) => b.is_video - a.is_video)
	// const videoList = mediaArr.filter(media => media.is_video)
	// const imageList = mediaArr.filter(media => !media.is_video)
	const [selectedThumb, setSelectedThumb] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [currentVid, setCurrentVid] = useState(1)
	// const [selectedMedia, setSelectedMedia] = useState(
	// 	mediaList.length ? mediaList[0].url : vaporLogo
	// );
	// const [isVideo, setIsVideo] = useState(
	// 	mediaList.length ? mediaList[0].is_video : false
	// );

	// console.log('mediaArr', mediaArr)
	// console.log('mediaList', mediaList)
	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};


	useEffect(() => {
		if (!isHovering && !isPlaying) {
			const nextSelectInterval = setInterval(() => {
				const nextIndex = (selectedThumb + 1) % mediaList.length;
				const nextMedia = mediaList[nextIndex];
				handleSelect(nextMedia.is_video, nextIndex, nextMedia.url);
			}, 5000);

			return () => clearInterval(nextSelectInterval);
		}
	}, [selectedThumb, mediaList, isHovering, isPlaying]);

	const videoRefs = useRef([]);

	const pauseVideo = (idx) => {
		console.log(videoRefs);
		// console.log('idx',idx);
		videoRefs.current[idx].pause();
	};

	const startVideo = (idx) => {
		videoRefs.current[idx].play();
	};

	const handleVideoPress = (idx) => {
		console.log('idx', idx)
		if(currentVid === null) {
			setCurrentVid(idx)
			startVideo(idx)
		}else if (currentVid !== idx) {
			pauseVideo(currentVid);
			setCurrentVid(idx)
			startVideo(idx)
		}
	};
	const handleSelect = (isVid, idx, url) => {
		console.log(currentVid)
		setIsPlaying(isVid);
		setSelectedThumb(idx);
		// setSelectedMedia(url);
		// setIsVideo(isVid);
	};

	return (
		<div className="d-flex p-0 media-ctn">
			<div className="left-col">
				<div className="showcase-ctn">
					<Figure className="figure-ctn">
						{mediaList &&
							mediaList.map((media, idx) => {
								return media.is_video ? (
									<video
										key={media.id}
										id={media.id}
										// onClick={() => handleVideoPress(idx)}
										controls
										muted
										ref={(el) => (videoRefs.current[media.id] = el)}
										preload="auto"
										autoPlay={true}
										className={
											selectedThumb === idx
												? "showcase-img-ctn selected-showcase"
												: "showcase-img-ctn"
										}
									>
										<source src={media.url} type="video/webm"></source>
									</video>
									// <iframe
									//  key={media.id}
									//  id={media.id}
									// 	src={media.url}
									// 	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									// 	allowFullScreen
									// 	className={
									// 		selectedThumb === idx
									// 			? "showcase-img-ctn selected-showcase"
									// 			: "showcase-img-ctn"
									// 	}
									// 	title="Embedded video"
									// />
								) : (

									// <div
									// 	key={media.id}
									// 	onMouseEnter={() => setIsHovering(true)}
									// 	onMouseLeave={() => setIsHovering(false)}
									// 	onClick={() => handleSelect(media.is_video, idx, media.url)}
									// 	className={
									// 		selectedThumb === idx ? "selected-thumbnail" : "thumbnail"
									// 	}
									// >
									// 	<Image className="thumb-img" src={media.thumbnail_url} />
									// </div>
									<img
										alt="171x180"
										onError={addDefaultSrc}
										key={media.id}
										src={media.url}
										className={
											selectedThumb === idx
												? "showcase-img-ctn selected-showcase"
												: "showcase-img-ctn"
										}
									/>
								);
							})}
						{/* {isVideo ? (
						// <video className="showcase-img-ctn" controls autoPlay>
						// 	<source src={selectedMedia} type='video/webm'></source>
						// </video>
						<iframe
							src={selectedMedia}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="showcase-img-ctn"
							title="Embedded youtube"
						/>
					) : (
						<FigureImage
							alt="171x180"
							src={selectedMedia}
							className="showcase-img-ctn"
						/>
					)} */}
					</Figure>
					<div className="showcase-reel">
						<div className="mb-1 showcase-scroll">
							{mediaList &&
								mediaList.map((media, idx) => {
									return media.is_video ? (
										<div
											key={media.id}
											onMouseEnter={() => setIsHovering(true)}
											onMouseLeave={() => setIsHovering(false)}
											onClick={() => {
												handleVideoPress(idx + 1);
												handleSelect(media.is_video, idx, media.url);
											}}
											className={
												selectedThumb === idx
													? "selected-thumbnail"
													: "thumbnail"
											}
										>
											<Image onError={addDefaultSrc} className="thumb-img" src={media.thumbnail_url} />
										</div>
									) : (
										<div
											key={media.id}
											onMouseEnter={() => setIsHovering(true)}
											onMouseLeave={() => setIsHovering(false)}
											onClick={() => {
												if(currentVid){
													pauseVideo(currentVid);
													setCurrentVid(null)
												}
												handleSelect(media.is_video, idx, media.url);
											}}
											className={
												selectedThumb === idx
													? "selected-thumbnail"
													: "thumbnail"
											}
										>
											<Image onError={addDefaultSrc} className="thumb-img" src={media.url} />
										</div>
									);
								})}
						</div>
					</div>
					<div className="mt-1 showcase-slider"></div>
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
