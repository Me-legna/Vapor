import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from "react-redux";

function OrderDetails(){
    const order = useSelector(state => state.orders.singleOrder)

    return (
			<Container
				style={{ backgroundColor: "rgb(1,1,1, 0.4)", color: "#82909a" }}
				className="mt-4 p-4"
			>
				<section>
					<Row>Transaction ID: 1708286993139{order.id}</Row>
					<Row>Type: {order.type} </Row>
					<Row>Purchased: {order.purchaseDate} </Row>
				</section>
				<br />
				<section>
					<Row>
						{order.items?.map((item) => (
							<Row
								key={item.id + item.game.title}
								style={{ color: "#5eafde" }}
							>{`${item.game.title} - $${item.amount}`}</Row>
						))}
					</Row>
				</section>
				<br />
				<section style={{ width: "20%" }}>
					<Row>
						<Col>Subtotal</Col>
						<Col style={{ color: "#5eafde" }}>${order.total}</Col>
					</Row>
					<Row>
						<Col>Discount</Col>
						<Col style={{ color: "#5eafde" }}>$0</Col>
					</Row>
					<Row>
						<Col>Tax</Col>
						<Col style={{ color: "#5eafde" }}>$0</Col>
					</Row>
					<Row style={{ border: "" }} className="border-top">
						<Col>Total</Col>
						<Col style={{ color: "#5eafde" }}>${order.total}</Col>
					</Row>
				</section>
			</Container>
		);
}

export default OrderDetails
