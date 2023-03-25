import {useSelector } from "react-redux";
import BuyGameBanner from "./BuyGameBanner";
import SystemRequirements from "./systemReqs";
import "./SingleGame.css";

function GameBody() {
	const singleGame = useSelector((state) => state.games.singleGame);
	// const [readMore, setReadMore] = useState(false);

	return (
		<div className="game-body-ctn">
			<div className="game-body-left">
				<BuyGameBanner />
				<section
					className="game-info-text"
					/* style={{maxHeight: readMore ? '850px' : 'none'}} */
				>
					<h3>ABOUT THIS GAME</h3>
					{singleGame.about}
				</section>
				{/* <section>
					<h2>MATURE CONTENT DESCRIPTION</h2>
				</section> */}
				<SystemRequirements/>
			</div>
			<div className="game-body-right"></div>
		</div>
	);
}

export default GameBody;
