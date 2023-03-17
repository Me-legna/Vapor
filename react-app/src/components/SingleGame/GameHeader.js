import { useSelector } from "react-redux";

function GameHeader() {
	const user = useSelector((state) => state.session.user);
	const game = useSelector((state) => state.games.singleGame);

	return (
		<header className="">
			<div className="pt-3" style={{ color: "#68c1f5" }}>
				<p style={{ color: "#8f98a0" }}>
					{`All Games > ${
						game.title ? `${game.genres[0]} > ${game.title}` : ""
					}`}
				</p>
				<h1 className="text-white">{game.title}</h1>
			</div>
		</header>
	);
}
export default GameHeader;
