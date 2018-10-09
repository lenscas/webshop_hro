import * as React from "react";
import BasicComponent from "../types/basicComponent";
import Form, { InputField, FormData } from "../components/form";

type submit = {
    test: string
}

export default class Login extends BasicComponent {
    onSubmit(data: FormData<submit>) {
        // tslint:disable-next-line:no-console
        console.log(data.values)
        // tslint:disable-next-line:no-console
        console.log(data.event)
        // tslint:disable-next-line:no-console
        console.log("Did submit")
    }
    render() {
        const fields: Array<InputField<string> | InputField<number>> = [
            {
                name: "E-mail",
                label: "E-mail",
                innerLabel: "Name@email.com",
                id: "e-mail",
                type: "email"
            },
            {
                name: "Password",
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

        return <Form<submit> onSubmit={this.onSubmit} inputs={fields}/>
	}
}