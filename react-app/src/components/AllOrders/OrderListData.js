import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function OrderListData() {
	const allOrders = useSelector((state) => state.orders.allOrders.byId);
	const ordersList = Object.values(allOrders);
	const history = useHistory()
	return (
		<>
			{ordersList.map((order) => {
				// if (order.total === 0) return <React.Fragment key={order.id + order.type}></React.Fragment>;
				return (
					<tr style={{cursor: 'pointer'}} onClick={() => history.push(`/orders/${order.id}`) } key={order.id}>
						<td key={order.id}>{order.purchaseDate}</td>
						<td>
							{order.items.map((item) => (
								<React.Fragment key={item.game.id}>
									{`${item.game.title} - $${item.amount}${item.is_refunded ? '(Refunded)' :''}`}
									<br />
								</React.Fragment>
							))}
						</td>
						<td>{order.type}</td>
						<td>{`$${order.total}`}</td>
					</tr>
				);
			})}
		</>
	);
}

export default OrderListData;
