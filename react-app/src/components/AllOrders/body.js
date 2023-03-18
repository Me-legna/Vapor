import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import OrderListData from "./OrderListData";
import './Orders.css'

function AllOrdersBody() {
	return (
		<Container className="p-0 pt-1 width-10">
			<Table hover  striped border="">
				<thead className="text-white table-hover"style={{ backgroundColor: "#0197cf"}}>
					<tr>
						<th className="text-center">Date</th>
						<th>Items</th>
						<th>Type</th>
						<th className="text-center">Total</th>
					</tr>
				</thead>
				<tbody >
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
