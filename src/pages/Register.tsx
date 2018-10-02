import * as React from "react";
import BasicComponent from "../types/basicComponent";
import Form, {InputField, FormData} from "../components/form";

type submit = {
	test : string
}

export default class Register extends BasicComponent {
	onSubmit(data : FormData<submit>){
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
				name : "Username",
                label : "Username",
                innerLabel: "MagicPro20XX",
                id : "username",
            },
            {
				name : "E-mail",
                label : "E-mail",
                innerLabel: "Billy@coolmail.com",
                id : "e-mail",
                type: "email"
            },
            {
				name : "Password",
                label : "Password",
                innerLabel: "C0mp1exXP@$$",
                id : "password-checker",
                type: "password"
            },
            {
				name : "Repeat password",
                label : "Repeat password",
                innerLabel: "C0mp1exXP@$$",
                id : "password",
                type: "password"
            },
			{
				name : "Honorific",
                label : "Title",
                innerLabel: "Mr. / Mrs. etc.",
				id : "honorific"
			},
			{
				name : "Submit",
                innerLabel: "Submit",
				id : "submit",
				type : "button"
			}
		]

		return <Form<submit> onSubmit={this.onSubmit} inputs={fields}/>
	}
}