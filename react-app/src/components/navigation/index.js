import "./Navigation.css";
import React from "react";
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useHistory, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import vaporLogo from "../../images/vapor-logo.png";
import { useDispatch, useSelector } from "react-redux";
import DemoLogin from "./DemoLogin";
import { login, logout } from "../../store/session";

const NaviBar = () => {
	const user = useSelector((state) => state.session.user);
	const demoEmail = "demo@aa.io";
	const demoPassword = "password";

	const history = useHistory();
	const dispatch = useDispatch();

	const onLogout = async (e) => {
		await dispatch(logout());
	};
	const demoLogin = async (e) => {
		await dispatch(login(demoEmail, demoPassword));
	};

	return (
		<NavBar
			sticky="top"
			variant="dark"
			collapseOnSelect
			expand="md"
			id="navbar"
		>
			<Container style={{ maxWidth: "960px" }} fluid="md" className="p-0 main">
				<NavBar.Brand as={Link} to="/store" className="logo-container">
					<img alt="logo" src={vaporLogo} width="100%" />
				</NavBar.Brand>
				<NavBar.Toggle />
				<NavBar.Collapse className="jc-sb">
					<Nav style={{ paddingRight: "5%" }} className="m-auto">
						{/*
                  <Nav.Link href="/library" className="text-white">
                     Doesn't use react-router-dom
                  */}
						<Nav.Link as={Link} to="/store">
							Store
						</Nav.Link>
						{/* <Nav.Link href="https://github.com/Me-legna/Vapor">
							Community
						</Nav.Link> */}
						{user && (
							<Nav.Link as={Link} to="/library">
								Library
							</Nav.Link>
						)}
						<Nav.Link href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwRCXCSCkTjDmHXWRvlRNZbKKQbGRtmsMLZNJlGzDxHFlwwNsjDLXStwMfPRPfSTjdhdKMV">
							Chat
						</Nav.Link>
						<Nav.Link href="https://agonzalez.dev/">Support</Nav.Link>
					</Nav>
					<Nav>
						{user ? (
							<NavDropdown title={user.username}>
								<NavDropdown.Item as={Link} to="/cart">
									View Cart
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/orders">
									Order History
								</NavDropdown.Item>
								<NavDropdown.Item
									className="d-flex drop-item"
									as={Link}
									to="/store"
									onClick={onLogout}
								>
									Logout: <p className="h-0">{user.username}</p>
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<NavDropdown title="Login">
								<NavDropdown.Item as={Link} to="/login">
									Login
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/store" onClick={demoLogin}>
									Demo User
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</NavBar.Collapse>
			</Container>
		</NavBar>
	);
};

export default NaviBar;
