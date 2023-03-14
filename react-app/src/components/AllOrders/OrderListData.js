import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function OrderListData() {
	const allOrders = useSelector((state) => state.orders.allOrders.byId);
	const ordersList = Object.values(allOrders);
	const history = useHistory()
	return (
		<>
			{ordersList.map((order) => {
				// if (order.total === 0) return <React.Fragment key={order.id + order.type}></React.Fragment>;
				return (
					<tr
						style={{ cursor: "pointer" }}
						onClick={() => history.push(`/orders/${order.id}`)}
						key={order.id}
					>
						<td
							style={{ color: "#7092A5" }}
							className="text-center"
							key={order.id}
						>
							{order.purchaseDate}
						</td>
						<td style={{ color: "white" }}>
							{order.items.map((item) => (
								<React.Fragment key={item.game.id}>
									{`${item.game.title} - $${item.amount}${
										item.is_refunded ? "(Refunded)" : ""
									}`}
									<br />
								</React.Fragment>
							))}
						</td>
						<td style={{ color: "white" }}>{order.type}</td>
						<td
							style={{ color: "white" }}
							className="text-center"
						>{`$${order.total}`}</td>
					</tr>
					// <Row style={{cursor: 'pointer'}} className="mt-3 table-hover" onClick={() => history.push(`/orders/${order.id}`) } key={order.id}>
					// 	<Col className="text-center" key={order.id}>{order.purchaseDate}</Col>
					// 	<Col className="">
					// 		{order.items.map((item) => (
					// 			<React.Fragment key={item.game.id}>
					// 				{`${item.game.title} - $${item.amount}${item.is_refunded ? '(Refunded)' :''}`}
					// 				<br />
					// 			</React.Fragment>
					// 		))}
					// 	</Col>
					// 	<Col className="text-center">{order.type}</Col>
					// 	<Col className="text-center">{`$${order.total}`}</Col>
					// </Row>
				);
			})}
		</>
	);
}

export default OrderListData;
