import * as React from "react";
import BasicPage from "../types/basicComponent";
import Form, { InputField, FormData } from "../components/form";
import {login, credentials} from "../services/users";
import { Redirect } from "react-router-dom";
import { retTrue } from "src/funcs/lambdas";

export default class Login extends BasicPage {
    onSubmit(data: FormData<credentials>) {
        login(data.values,this.props.APIS.req)
    }
    render() {
        if(this.props.APIS.userId){
            return <Redirect to="/ListTest"/>
        }
        const fields: InputField[] = [
            {
                name: "email",
                label: "E-mail",
                placeholder: "Name@email.com",
                id: "e-mail",
                type: "email",
                validator: retTrue
            },
            {
                name: "password",
                label: "Password",
                placeholder: "Password",
                id: "password-checker",
                type: "password",
                validator: retTrue
            },
            {
                name: "Submit",
                placeholder: "Submit",
                id: "submit",
                type: "button"
            }
        ]
        const submit = (data : FormData<credentials>)=>this.onSubmit(data)
        return <Form<credentials> onSubmit={submit} inputs={fields}/>
	}
}