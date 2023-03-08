import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrders } from "../../store/orders";
import AllOrdersBody from "./Body";
import AllOrdersHeader from "./Header";

function AllOrders() {
	const user = useSelector(state => state.session.user)
	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(loadAllOrders())
	},[dispatch])

	return (
		<>
			<AllOrdersHeader />
			<AllOrdersBody />
		</>
	);
}

export default AllOrders;
