import * as React from "react";
import { Route, Switch } from "react-router-dom";
import BasicComponent from "../types/basicComponent";
import Register from "../pages/Register";
import ProductList from "../pages/ProductList";
import Login from "../pages/LoginPage";
import Home from "src/pages/HomePage";
import Products from "src/pages/DetailPage";
import ContactPage from "src/pages/ContactPage";
import Cart from "src/pages/Cart"

export default class Routes extends BasicComponent {
	public render(){
		return (
			<div>
				<Switch>
					<Route exact={true} path="/" ><Home/></Route>
					<Route exact={true} path="/register"><Register APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/products"><ProductList APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/cart"><Cart APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/login"><Login APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/contact"><ContactPage APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/product/:id"><Products APIS={this.props.APIS}/></Route>
				</Switch>

			</div>
		)
	}

}