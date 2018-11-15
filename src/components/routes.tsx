import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import BasicPage from "../types/basicComponent";
import Register from "../pages/Register";
import ProductList from "../pages/ProductList";
import Login from "../pages/LoginPage";
import Home from "src/pages/HomePage";
import Products from "src/pages/DetailPage";
import ContactPage from "src/pages/ContactPage";
import Cart from "src/pages/Cart"


export default class Routes extends BasicPage {
	loadProduct = (props :RouteComponentProps<{id:string}>) => <Products
		APIS={this.props.APIS}
		match={props.match}
	/>
	public render(){
		return (
			<>
				<Switch>
					<Route exact={true} path="/" ><Home/></Route>
					<Route exact={true} path="/register"><Register APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/products"><ProductList APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/cart"><Cart APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/login"><Login APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/contact"><ContactPage APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/product/:id" render={this.loadProduct} />
				</Switch>

			</>
		)
	}

}