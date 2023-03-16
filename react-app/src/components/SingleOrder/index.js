import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { loadOneOrder } from "../../store/orders";
import Issues from "./Issues";
import OrderDetails from "./OrderDetails";
import "./SingleOrder.css";

function SingleOrder() {
	const user = useSelector((state) => state.session.user);
	const order = useSelector((state) => state.orders.singleOrder);
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();
	const { orderId } = useParams();

	useEffect(() => {
		dispatch(loadOneOrder(orderId));
		setLoaded(true);
	}, [dispatch, orderId]);

	// if((!user || !order.id) && user.id !== order.customer_id) return null
	return (
		loaded && (
			<div className="main">
				<Container>
					<Row>
						<Col lg className="text-white p-3">
							Vapor Support
						</Col>
					</Row>
					<Row>
						<Col>
							{/* <Button className="text-white btn-link">Home</Button>
						{" > "}
						<Button className="btn-link">Recent Purchases</Button> */}
							<p style={{ color: "#8f98a0" }}>
								{"Home  >  Account  >  Purchase History"}
							</p>
						</Col>
					</Row>
					<OrderDetails />
					<Issues />
				</Container>
			</div>
		)
	);
}

export default SingleOrder;
