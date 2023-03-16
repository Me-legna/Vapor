import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import OwnedGames from "./OwnedGames";
import './Library.css'

function Library() {
	const user = useSelector(state => state.session.user)

	return (
		<div className="main">
			<Container className="text-white">
				<p style={{ color: "#8f98a0" }}>{`${user.username} > Library`}</p>
				<h1>Library</h1>
				<OwnedGames/>
			</Container>
		</div>
	);
}

export default Library;
