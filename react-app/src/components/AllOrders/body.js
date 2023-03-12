import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderListData from "./OrderListData";
import { Container } from "react-bootstrap";

function AllOrdersBody() {
	return (
		<Container className="width-10">
			<Table hover striped border="">
				<thead>
					<tr>
						<th className="text-center">Date</th>
						<th>Items</th>
						<th>Type</th>
						<th className="text-center">Total</th>
					</tr>
				</thead>
				<tbody>
					<OrderListData />
				</tbody>
			</Table>
			{/* <Row>
				<Col className="text-center">Date</Col>
				<Col className="">Items</Col>
				<Col className="text-center">Type</Col>
				<Col className="text-center">Total</Col>
			</Row>
			<OrderListData />
			*/}
		</Container>
	);
}

export default AllOrdersBody;
