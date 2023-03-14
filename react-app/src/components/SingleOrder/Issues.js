// import Container from "react-bootstrap/Container";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Image from "react-bootstrap/Image";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import vaporLogo from "../../images/vapor-icon.png";
import { refundOrder } from "../../store/orders";

function Issues() {
	const order = useSelector((state) => state.orders.singleOrder);
	const msg = "Refunding this item will also remove it from your library. Continue?"
	const [show, setShow] = useState(false);
	const [refunded, setRefunded] = useState(false);
	const [itemId, setItemId] = useState();
	const [message, setMessage] = useState(msg);
	const dispatch = useDispatch()

	const addDefaultSrc = (e) => {
		e.target.onerror = null; // prevents looping
		e.target.src = vaporLogo;
	};
	const handleSubmit = () => {
		console.log("itemId", itemId);
		dispatch(refundOrder(order.id, itemId)).then(resMsg => {
			if (resMsg) setMessage(resMsg)
			else setMessage('Item has been refunded.')
		})
		setRefunded(true)
	};
	const handleHide = () => {
		setShow(false)
		setRefunded(false)
		setMessage(msg)
	}
	const handleShow = (item_id) => {
		setRefunded(false)
		setItemId(item_id);
		setShow(true);
	};

	return (
		<div className="mt-4 align-baseline" style={{ color: "#5eafde" }}>
			<h4>What issue are you having with this purchase?</h4>
			<div>
				{order.items?.map((item) => (
					<div
						// style={{ backgroundColor: "#445468", width: "100%" }}
						key={item.id + item.game.title}
						className="mt-2 align-items-center indiv-item clickable item-list"
						onClick={() => handleShow(item.game.id)}
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
						<i className="fa-sharp fa-solid fa-play m-4"></i>
					</div>
				))}
			</div>
			<Modal show={show} onHide={handleHide}>
				<Modal.Header closeButton>
					<Modal.Title>Refund Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>{message}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleHide}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={refunded ? handleHide : handleSubmit}
					>
						Continue
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Issues;
