import { useSelector } from "react-redux";

function AllOrdersHeader() {
	const user = useSelector((state) => state.session.user);

	return (
		<header className="single-header">
			<div className="single-header-left">
				<p>{"Home > Account > Purchase History"}</p>
				<h1>{`${user.username}'s Purchase History`}</h1>
				Problem with a transaction? Select it below to get help.
			</div>
		</header>
	);
}

export default AllOrdersHeader;
