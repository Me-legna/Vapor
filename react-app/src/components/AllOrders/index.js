import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrders } from "../../store/orders";
import AllOrdersBody from "./body";
import AllOrdersHeader from "./header";

function AllOrders() {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllOrders());
	}, [dispatch]);

	return (
			<Container>
				<AllOrdersHeader />
				<AllOrdersBody />
			</Container>
	);
}

export default AllOrders;
