import OrderListData from "./OrderListData";

function AllOrdersBody() {

	return (
		<section>
			<div>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Items</th>
							<th>Type</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<OrderListData/>
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default AllOrdersBody;
