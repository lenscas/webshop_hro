import * as React from "react";
import BasicPage from "../types/basicComponent";
import Form, {InputField, FormData} from "../components/form";

type testSubmit = {
	test : string
}

export default class FormTest extends BasicPage {
	onSubmit(data : FormData<testSubmit>){
		// tslint:disable-next-line:no-console
		console.log(data.values)
		// tslint:disable-next-line:no-console
		console.log(data.event)
		// tslint:disable-next-line:no-console
		console.log("Did submit")
	}
	render(){
		const fields : Array<InputField<string> | InputField<number>>= [
			{
				name : "testString",
				label : "This is to test strings",
				id : "teststring",
			},
			{
				name : "testNumber",
				label : "This is to test number",
				id : "testnumber",
				type : "number"
			},
			{
				name: "limited",
				label : "can't enter test",
				id : "limited",
				validator: (check : string)=>check !== "test" ? true : {isValid : false, message : "This field may not have the value test"}
			},
			{
				name : "submit",
				label: "submit",
				id : "submit",
				type : "button"
			}
		]

		return <Form<testSubmit> onSubmit={this.onSubmit} inputs={fields}/>
	}
}