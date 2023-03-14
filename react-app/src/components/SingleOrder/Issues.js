// import Container from "react-bootstrap/Container";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Button from "react-bootstrap/Button";
// import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import vaporLogo from "../../images/vapor-icon.png";

function Issues() {
	const order = useSelector((state) => state.orders.singleOrder);
	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};
	return (
		<div className="mt-4 align-baseline" style={{ color: "#5eafde" }}>
			<h4>What issue are you having with this purchase?</h4>
			<div>
				{order.items?.map((item) => (
					// <div>hi</div>

					// <Button
					// 	style={{width:'80%', }}
					// 	key={item.id}
					// 	variant="default"
					// 	className="border rounded-0 mb-2 issue-button issue-button-arrow"
					// >
					// 	<div style={{ height: "100%", width: "100%" }}>
					// 		<Image
					// 			src={item.game.cover}
					// 			onError={addDefaultSrc}
					// 			alt={item.game.title}
					// 			thumbnail
					// 		/>
					// 	</div>
					// 	<div>I would like to refund {item.game.title}</div>
					// </Button>

					<div
						key={item.id}
						// style={{ backgroundColor: "#445468", width: "100%" }}
						className="mt-2 align-items-center indiv-item clickable item-list"
						// onClick={() => handleClick(item.id)}
					>
						{/* {console.log('game', game)} */}
						<div className="game-list-image-container">
							<img
								className="game-list-image p-1"
								src={item.game.cover}
								onError={addDefaultSrc}
								alt="game-img"
							></img>
						</div>
						<div className="p-3 align-center game-list-info-container">
							{`I would like a refund for ${item.game.title}`}
							{/* <div className="game-list-left-info"> */}
							{/* </div> */}
						</div>
						<i class="fa-sharp fa-solid fa-play m-4"></i>
					</div>
				))}
			</div>
		</div>
	);
}

export default Issues;
