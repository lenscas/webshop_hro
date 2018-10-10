import * as React from "react";
import {register,RegisterUser} from "../services/users";
import BasicComponent from "../types/basicComponent";
import Form, {InputField, FormData} from "../components/form";

export default class Register extends BasicComponent {
	onSubmit(data : FormData<RegisterUser>){
		register(data.values, this.props.APIS.req);
	}
	render(){
		const fields : Array<InputField<string> | InputField<number>>= [
			{
				name : "username",
                label : "Username",
                innerLabel: "Username",
                id : "username",
            },
            {
				name : "email",
                label : "E-mail",
                innerLabel: "E-mail@example.com",
                id : "e-mail",
                type: "email"
            },
            {
				name : "password",
                label : "Password",
                innerLabel: "Password",
                id : "password-checker",
                type: "password"
            },
            {
				name : "repeatPassword",
                label : "Repeat password",
                innerLabel: "Repeat password",
                id : "password",
                type: "password"
            },
			{
				name : "approach",
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
		const onSubmit =(data :FormData<RegisterUser> )=>this.onSubmit(data)
		return <Form<RegisterUser> onSubmit={onSubmit} inputs={fields}/>
	}
}