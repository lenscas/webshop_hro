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
import BasicPage from 'src/types/basicComponent';
import { props } from 'src/types/BasicProps';
import { logOut } from 'src/services/users';


export default class Header extends BasicPage<props,{isOpen:boolean}> {
	constructor(propsi) {
		super(propsi);

		this.toggle = this.toggle.bind(this);
		this.state = {
		  isOpen: false
		};
		this.logOut = this.logOut.bind(this)
	  }
	  toggle() {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	  }
	logOut(){
		this.props.APIS.setUserId();
		return logOut(this.props.APIS.req);
	}
	renderLoggedInLinks(){
		if(this.props.APIS.userId){
			return (
			<NavItem>
			<NavLink tag={Link} to="/decks">Decks</NavLink>
			</NavItem>
			)}
			return <></>
	}
	renderLoggedOutLinks(){
		if(!this.props.APIS.userId){
			return (
				<>
				<NavItem>
				<NavLink tag={Link} to="/register">Register</NavLink>
			</NavItem>
			<NavItem>
				<NavLink tag={Link} to="/login">Login</NavLink>
			</NavItem>
			</>
			)}
			return <>			
			<NavItem>
			<NavLink onClick={this.logOut} tag={Link} to="/">Logout</NavLink>
		</NavItem>
		</>
			
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
					{this.renderLoggedInLinks()}
					<NavItem>
					  <NavLink tag={Link} to="/contact">Contact us</NavLink>
					</NavItem>
					{this.renderLoggedOutLinks()}
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