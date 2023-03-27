import { useSelector } from "react-redux";

function AllOrdersHeader() {
	const user = useSelector((state) => state.session.user);

	return (
		<header>
			<div className="pt-3" style={{ color: "#68c1f5" }}>
				<p style={{ color: "#8f98a0" }}>
					{"Home > Account > Order History"}
				</p>
				<h1 className="pb-3 text-white">{`${user.username}'s Order History`}</h1>
				Problem with a transaction? Select it below to get help.
			</div>
		</header>
	);
}

export default AllOrdersHeader;
