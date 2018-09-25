import * as React from "react";
import {props} from "./BasicProps";

export default class BasicComponent< Props1 extends props = props, State extends {} = {}> extends React.Component<Props1,State> {
	// tslint:disable-next-line
	public methods : { [s:string]:Function}
	constructor(propsy : any){
		super(propsy);
		if(!this.methods){
			return
		}
		Object.keys(this.methods).forEach(element =>{
			console.log(this)
			this.methods[element] = this.methods[element].bind(this)
		});
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