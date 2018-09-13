import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.StatelessComponent<{}> = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-dark text-white header">
			<ul className="nav navbar-nav">
				<li><Link className="nav nav-link text-white" to="/list">List</Link></li>
			</ul>
		</nav>
	);
}
export default Header;