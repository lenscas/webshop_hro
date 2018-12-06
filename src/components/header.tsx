import * as React from 'react';
// import { Link } from 'react-router-dom';

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

export default class Header extends React.Component<{},{isOpen:boolean}> {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
		  isOpen: false
		};
	  }
	  toggle() {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	  }

	render() {
		return(
			<div>
			  <Navbar color="light" light={true} expand="md">
				<NavbarBrand href="/">reactstrap</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar={true}>
				  <Nav className="ml-auto" navbar={true}>
					<NavItem>
					  <NavLink tag={Link} to="/" href="/">Home</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/products">Cards</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/">Boosters</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/decks">Decks</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/contact">Contact us</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/register">Register</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/login">Login</NavLink>
					</NavItem>
					<NavItem>
						<NameSearch/>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/cart">
							<img className="cart" src="https://www.supermarktscanner.nl/img/cart1.png"/>
						</NavLink>
					</NavItem>

				  </Nav>
				</Collapse>
			  </Navbar>
			</div>
		  );

		// (
		// 	<nav className="navbar navbar-expand-lg navbar-light bg-dark text-white header">
		// 		<ul className="nav navbar-nav">
		// 		<NavbarToggler onClick={this.toggle} />
		// 		<Collapse isOpen={this.state.isOpen} navbar>
		// 			<li><Link className="nav nav-link text-white" to="/">Home</Link></li>
		// 			<li><Link className="nav nav-link text-white" to="/products">Cards</Link></li>
		// 			<li><Link className="nav nav-link text-white" to="/products">Boosters</Link></li>
		// 			<li><Link className="nav nav-link text-white" to="/products">Decks</Link></li>
		// 			<li><Link className="nav nav-link text-white" to="/contact">Contact us</Link></li>
		// 			<li><Link className="nav nav-link text-white" to="/register">Register</Link></li>
		// 			<li><Link className="nav nav-link text-white" to="/login">Login</Link></li>
		// 			<li><form className="search"><input type="text" placeholder="Search"/></form></li>
		// 			<li><img className="cart" src="https://www.supermarktscanner.nl/img/cart1.png"/></li>
		// 		</Collapse>
		// 		</NavbarToggler>
		// 		</ul>
		// 	</nav>

		// );
	}
}