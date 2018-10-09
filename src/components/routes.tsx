import * as React from "react";
import { Route, Switch } from "react-router-dom";
import BasicComponent from "../types/basicComponent";
import Register from "../pages/Register";
import Login from "../pages/LoginPage";
export default class Routes extends BasicComponent {
	public render(){
		return (
			<div>
				<Switch>
					<Route exact={true} path="/" ><h1>Test</h1></Route>
					<Route exact={true} path="/Register"><Register APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/Login"><Login APIS={this.props.APIS}/></Route>
				</Switch>

			</div>
		)
	}

}