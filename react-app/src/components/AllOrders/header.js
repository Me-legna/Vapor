import { useSelector } from "react-redux";

function AllOrdersHeader() {
	const user = useSelector((state) => state.session.user);

	return (
		<header className="">
			<div style={{ color: "#68c1f5" }}>
				<p style={{ color: "#8f98a0" }}>
					{"Home > Account > Order History"}
				</p>
				<h1 className="text-white">{`${user.username}'s Order History`}</h1>
				Problem with a transaction? Select it below to get help.
			</div>
		</header>
	);
}

export default AllOrdersHeader;
