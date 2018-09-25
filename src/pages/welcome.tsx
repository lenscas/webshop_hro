import BasicComponent from "../types/basicComponent";
import * as React from "react";

export default class Welcome extends BasicComponent {
	methods = {
		test(a : string){
			console.log(a)
			console.log(this)
		}
	}
	render(){
		this.methods.test("test")
		return <p>AWESOME! 2</p>
	}
}
