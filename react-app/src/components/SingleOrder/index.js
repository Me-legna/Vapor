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
import OrderHeader from "./OrderHeader";

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
				<>
					<OrderHeader/>
					<OrderDetails />
					<Issues />
				</>
		)
	);
}

export default SingleOrder;
