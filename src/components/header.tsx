import * as React from 'react';

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
			  <Navbar light={true} expand="md" className = "header">
				<NavbarBrand href="/"><img src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png" style = {{height:"16vh"}}/></NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar={true}>
				  <Nav className="ml-auto" navbar={true}>
					<NavItem>
					  <NavLink tag={Link} to="/" href="/" className="moveDown">Home</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/products" className="moveDown">Cards</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/" className="moveDown">Boosters</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink tag={Link} to="/decks" className="moveDown">Decks</NavLink>
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
					<NavItem className="moveDown">
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