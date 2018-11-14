import * as React from "react";
import { nothing } from "src/funcs/lambdas";
export default class BasicComponent< Props extends {}, State extends {} = {}> extends React.Component<Props,State> {
	constructor(propsy : any){
		super(propsy);
	}
	easySetState(newData : Partial<State>,callBack? : ()=>void){
		callBack = callBack || nothing
		this.setState( (v : object)=>{
			const test : object = newData;
			return {...v, ...test}
		},callBack)

	}
}