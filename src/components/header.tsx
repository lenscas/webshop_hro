import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.StatelessComponent<{}> = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-dark text-white header">
			<ul className="nav navbar-nav">
				<li><Link className="nav nav-link text-white" to="/">Home</Link></li>
				<li><Link className="nav nav-link text-white" to="/products">Cards</Link></li>
				<li><Link className="nav nav-link text-white" to="/products">Boosters</Link></li>
				<li><Link className="nav nav-link text-white" to="/products">Decks</Link></li>
				<li><Link className="nav nav-link text-white" to="/contact">Contact us</Link></li>
				<li><Link className="nav nav-link text-white" to="/register">Register</Link></li>
				<li><Link className="nav nav-link text-white" to="/login">Login</Link></li>
				<li><form className="search"><input type="text" placeholder="Search"/></form></li>
				<li><img className="cart" src="https://www.supermarktscanner.nl/img/cart1.png"/></li>
			</ul>
		</nav>
	);
}
export default Header;