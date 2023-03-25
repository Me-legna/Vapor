import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addToCart } from "../../store/cart";
import { authenticate } from "../../store/session";
import AddedToLibrary from "../Cart/AddedToLibrary";
import Button from "react-bootstrap/Button";
import logo from "../../images/vapor-icon.png";

function BuyGameBanner() {
	const singleGame = useSelector((state) => state.games.singleGame);
	const user = useSelector((state) => state.session.user);
	const inLibrary =
		user && user.games_owned.find((game) => game.id === singleGame.id);
	const inCart =
		user && user.cart.items.find((game) => game.id === singleGame.id);
	const dispatch = useDispatch();
	const history = useHistory();
	const { setModalContent } = useModal();
    

	async function addGame(e, gameId) {
		e.preventDefault();
		if (user) {
			await dispatch(addToCart(gameId));
			await dispatch(authenticate());
			if (singleGame.price === 0) {
				setModalContent(<AddedToLibrary />);
			} else {
				history.push("/cart");
			}
		} else {
			history.push("/login");
		}
	}

	return (
		<div className="mt-5 text-white add-to-ctn">
			<div className="d-flex align-items-center detail-icon-ctn">
				{singleGame.systems.map((system, idx) =>
					system === "Windows" ? (
						<i key={`${idx}`} className="system-icon fa-brands fa-windows"></i>
					) : system === "MacOS" ? (
						<i key={`${idx}`} className="system-icon fa-brands fa-apple"></i>
					) : (
						<img
							key={`${idx}`}
							src={logo}
							alt="logo"
							className="system-icon logo"
						></img>
					)
				)}
			</div>
			{inLibrary ? (
				<>
					<div></div>
					<div>{singleGame.title} is already in your Vapor library</div>
				</>
			) : (
				<>
					<h1>
						{singleGame.price === 0 ? "Play" : "Buy"} {singleGame.title}
					</h1>
					<div className="d-flex align-items-center add-to-btn-ctn">
						<div className="game-price">${singleGame.price}</div>
						<div>
							<Button
								className={
									singleGame.price === 0
										? "add-to-library-btn"
										: "add-to-cart-btn"
								}
								onClick={(e) => addGame(e, singleGame.id)}
							>
								{singleGame.price === 0
									? // ? "Add to Cart"
									  "Add to Library"
									: inCart
									? "In Cart"
									: "Add to Cart"}
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
export default BuyGameBanner;
