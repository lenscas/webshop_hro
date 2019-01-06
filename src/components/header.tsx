import * as React from 'react';
// import { Link } from 'react-router-dom';
import "../style/header.css";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { NameSearch } from './nameSearch';
import BasicPage from 'src/types/basicComponent';
import { props } from 'src/types/BasicProps';
import { logOut } from 'src/services/users';


export default class Header extends BasicPage<props, { isOpen: boolean }> {
	constructor(propsi) {
		super(propsi);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
		this.logOut = this.logOut.bind(this)
	}
	logOut() {
		this.props.APIS.setUserId();
		return logOut(this.props.APIS.req);
	}
	renderLoggedInLinks() {
		if (this.props.APIS.userId) {
			if (this.props.APIS.role === "Admin") {
				return (
					<NavItem>
						<NavLink tag={Link} to="/admin" className="moveDown">Admin</NavLink>
					</NavItem>
				)
			} else if (this.props.APIS.role === "User") {
				return (
					<>
						<NavItem>
							<NavLink tag={Link} to="/products" className="moveDown">Cards</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to="/decks" className="moveDown">Decks</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to="/contact" className="moveDown">Contact us</NavLink>
						</NavItem>
					</>
				)
			}
		}
		return <></>

	}
	renderLoggedOutLinks() {
		if (!this.props.APIS.userId) {
			return (
				<>
					<NavItem>
						<NavLink tag={Link} to="/products" className="moveDown">Cards</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/contact" className="moveDown">Contact us</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/register" className="moveDown">Register</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/login" className="moveDown">Login</NavLink>
					</NavItem>
				</>
			)
		}
		return <>
			<NavItem>
				<NavLink onClick={this.logOut} tag={Link} to="/" className="moveDown">Logout</NavLink>
			</NavItem>
		</>

	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar light={true} expand="md" className="header">
					<NavbarBrand href="/"><img src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png" style={{ height: "16vh" }} /></NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar={true}>
						<Nav className="ml-auto" navbar={true}>
							<NavItem>
								<NavLink tag={Link} to="/" href="/" className="moveDown">Home</NavLink>
							</NavItem>
							{this.renderLoggedInLinks()}
							{this.renderLoggedOutLinks()}
							<NavItem className="moveDown">
								<NameSearch />
							</NavItem>
							<NavItem>
								<NavLink tag={Link} to="/cart">
									<img className="cart" src="https://www.supermarktscanner.nl/img/cart1.png" />
								</NavLink>
							</NavItem>

						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}

}