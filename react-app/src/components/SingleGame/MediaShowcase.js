import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import vaporLogo from "../../images/vapor-icon.png";
import "./SingleGame.css";

function MediaShowcase() {
	const mediaArr = useSelector((state) => state.games.singleGame.media);
	const mediaList = mediaArr.sort((a, b) => b.is_video - a.is_video);
	// const videoList = mediaArr.filter(media => media.is_video)
	// const imageList = mediaArr.filter(media => !media.is_video)
	const [selectedThumb, setSelectedThumb] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [currentVid, setCurrentVid] = useState(mediaList[0].is_video ? 1 : null);

	useEffect(() => {
		if (!isHovering && !isPlaying) {
			const nextSelectInterval = setInterval(() => {
				const nextIndex = (selectedThumb + 1) % mediaList.length;
				const nextMedia = mediaList[nextIndex];
                const nextIsVid = mediaList[nextIndex].is_video;
                if(nextIsVid){
                    handleVideoPress(nextIndex + 1)
                }
				handleSelect(nextMedia.is_video, nextIndex);
			}, 5000);

			return () => clearInterval(nextSelectInterval);
		}
	}, [selectedThumb, mediaList, isHovering, isPlaying]);

	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};

	const videoRefs = useRef([]);

	const pauseVideo = (idx) => {
		videoRefs.current[idx].pause();
	};

	const startVideo = (idx) => {
		videoRefs.current[idx].play();
	};

	const handleVideoPress = (idx) => {
		if (currentVid === null) {
			setCurrentVid(idx);
			startVideo(idx);
		} else if (currentVid !== idx) {
			pauseVideo(currentVid);
			setCurrentVid(idx);
			startVideo(idx);
		}
	};
	const handleSelect = (isVid, idx) => {
		setIsPlaying(isVid);
		setSelectedThumb(idx);
	};

	return (
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
									onEnded={() => setIsPlaying(false)}
									muted
                                    style={{cursor:"pointer"}}
									ref={(el) => (videoRefs.current[idx + 1] = el)}
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
							) : (
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
											selectedThumb === idx ? "thumbnail selected-thumb" : "thumbnail"
										}
									>
										<Image
											onError={addDefaultSrc}
											className="thumb-img"
											src={media.thumbnail_url}
										/>
                                        <div className="play-btn-ctn">
										<i className="fa-solid fa-play play-vid-btn"></i>
                                        </div>
									</div>
								) : (
									<div
										key={media.id}
										onMouseEnter={() => setIsHovering(true)}
										onMouseLeave={() => setIsHovering(false)}
										onClick={() => {
											if (currentVid) {
												pauseVideo(currentVid);
												setCurrentVid(null);
											}
											handleSelect(media.is_video, idx, media.url);
										}}
										className={
											selectedThumb === idx ? "thumbnail selected-thumb" : "thumbnail"
										}
									>
										<Image
											onError={addDefaultSrc}
											className="thumb-img"
											src={media.url}
										/>
									</div>
								);
							})}
					</div>
				</div>
				{/* <div className="mt-1 showcase-slider"></div> */}
			</div>
		</div>
	);
}

export default MediaShowcase;
