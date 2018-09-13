import * as React from "react";
import { Route } from "react-router-dom";
import Welcome from "../pages/welcome";
import BasicComponent from "../types/basicComponent";
export default class Routes extends BasicComponent {
	public render(){
		return (
			<div>
				<Route exact={true} path="/" ><Welcome APIS={this.props.APIS}/></Route>
			</div>
		)
	}

}