import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function OrderDetails(){
    const order = useSelector(state => state.orders.singleOrder)

    return (
			<Container className="mt-4">
				<section>
					<Row>Transaction ID: 1708286993139{order.id}</Row>
					<Row>Type: {order.type} </Row>
					<Row>Purchased: {order.purchaseDate} </Row>
				</section>
				<br />
				<section>
					<Row>
						{order.items?.map((item) => (
							<Row>{`${item.game.title} - $${item.amount}`}</Row>
						))}
					</Row>
				</section>
				<br />
				<section>
					<Row>Subtotal ${order.total}</Row>
					<Row>Discount -$0</Row>
					<Row>Tax $0</Row>
					<Row className="border-top">Total ${order.total}</Row>
				</section>
			</Container>
		);
}

export default OrderDetails
