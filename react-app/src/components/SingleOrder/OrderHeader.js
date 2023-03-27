import { useSelector } from "react-redux";

function OrderHeader() {
	const user = useSelector((state) => state.session.user);

	return (
		<header>
			<div className="pt-3" style={{ color: "#68c1f5" }}>
				<p style={{ color: "#8f98a0" }}>{"Home > Account > Order History"}</p>
				<h1 className="pb-3 text-white">{"Vapor Support"}</h1>
			</div>
		</header>
	);
}

export default OrderHeader;
