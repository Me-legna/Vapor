import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderListData from "./OrderListData";

function AllOrdersBody() {

	return (
		// <section>
		// 	<div>
		// 		<table>
		// 			<thead>
		// 				<tr>
		// 					<th>Date</th>
		// 					<th>Items</th>
		// 					<th>Type</th>
		// 					<th>Total</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				<OrderListData/>
		// 			</tbody>
		// 		</table>
		// 	</div>
		// </section>
		<Container fluid>
			<Row>
				<Col className="text-center">Date</Col>
				<Col className="text-center">Items</Col>
				<Col className="text-center">Type</Col>
				<Col className="text-center">Total</Col>
			</Row>
		</Container>
	);
}

export default AllOrdersBody;
