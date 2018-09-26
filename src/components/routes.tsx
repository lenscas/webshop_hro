import * as React from "react";
import { Route, Switch } from "react-router-dom";
import BasicComponent from "../types/basicComponent";
import FormTest from "../pages/FormTest";
export default class Routes extends BasicComponent {
	public render(){
		return (
			<div>
				<Switch>
					<Route exact={true} path="/" ><h1>Test</h1></Route>
					<Route exact={true} path="/formTest"><FormTest APIS={this.props.APIS}/></Route>
				</Switch>

			</div>
		)
	}

}