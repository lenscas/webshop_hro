import * as React from "react";
import { Route, Switch } from "react-router-dom";
import BasicComponent from "../types/basicComponent";
import Register from "../pages/Register";
import ListTest from "../pages/ListTest";
import Login from "../pages/LoginPage";
import Home from "src/pages/HomePage";

export default class Routes extends BasicComponent {
	public render(){
		return (
			<div>
				<Switch>
					<Route exact={true} path="/" ><Home/></Route>
					<Route exact={true} path="/Register"><Register APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/ListTest"><ListTest APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/Login"><Login APIS={this.props.APIS}/></Route>
				</Switch>

			</div>
		)
	}

}