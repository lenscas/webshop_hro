import * as React from "react";
import {props} from "./BasicProps";

export default class BasicComponent< Props1 extends props = props, State extends {} = {}> extends React.Component<Props1,State> {
	constructor(propsy : any){
		super(propsy);
	}

	easySetState(newData : Partial<State>){
		this.setState( (v : object)=>{
			const test : object = newData;
			return {...v, ...test}
		})

	}
	componentWillUnmount(){
		this.props.APIS.clearAlerts()
	}
}