import { useSelector } from "react-redux";

function OrderListData() {
	const allOrders = useSelector((state) => state.orders.allOrders.byId);
	const ordersList = Object.values(allOrders);
	return (
		<>
			{ordersList.map((order) => {
				if (order.total === 0) return null;
				else
					return (
						<tr>
							<td>{order.purchaseDate}</td>
							<td>
								{order.items.map((item) => (
									<>
										{`${item.game.title}`}
										<br />
									</>
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
