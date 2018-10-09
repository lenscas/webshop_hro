import * as React from "react";
import BasicComponent from "../types/basicComponent";
import Form, { InputField, FormData } from "../components/form";
import {login, credentials} from "../services/users";

export default class Login extends BasicComponent {
    onSubmit(data: FormData<credentials>) {
       login(data.values,this.props.APIS.req)
    }
    render() {
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
                innerLabel: "C0mp1exXP@$$",
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