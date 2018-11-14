import * as React from "react";
import BasicPage from "../types/basicComponent";
import Form, { InputField, FormData } from "../components/form";
import {login, credentials} from "../services/users";
import { Redirect } from "react-router-dom";

export default class Login extends BasicPage {
    onSubmit(data: FormData<credentials>) {
       login(data.values,this.props.APIS.req)
    }
    render() {
        if(this.props.APIS.userId){
            return <Redirect to="/ListTest"/>
        }
        const fields: Array<InputField<string> | InputField<number>> = [
            {
                name: "email",
                label: "E-mail",
                innerLabel: "Name@email.com",
                id: "e-mail",
                type: "email"
            },
            {
                name: "password",
                label: "Password",
                innerLabel: "Password",
                id: "password-checker",
                type: "password"
            },
            {
                name: "Submit",
                innerLabel: "Submit",
                id: "submit",
                type: "button"
            }
        ]
        const submit = (data : FormData<credentials>)=>this.onSubmit(data)
        return <Form<credentials> onSubmit={submit} inputs={fields}/>
	}
}