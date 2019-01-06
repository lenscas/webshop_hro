import * as React from "react";
import BasicPage from "../types/basicComponent";
import Form, { InputField, FormData } from "../components/form";
import { login, credentials } from "../services/users";
import { Redirect } from "react-router-dom";
import { retTrue } from "src/funcs/lambdas";
import { props } from "src/types/BasicProps";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";

type loginState = {
    success? : {success: boolean, message}
}

export default class Login extends BasicPage<props, loginState> {
    constructor(propsy) {
        super(propsy)
        this.state = {}
        this.onSubmit = this.onSubmit.bind(this)
    }
    async onSubmit(data: FormData<credentials>) {
        const res = await login(data.values, this.props.APIS.req)
        if (!(typeof res === 'boolean')) {
            this.easySetState({success : {success : res.success, message: res.message}})
        }
    }
    render = () => {
        if (this.props.APIS.userId) {
            return <Redirect to="/" />
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
        const submit = (data: FormData<credentials>) => this.onSubmit(data)
        return (
            <>
                {
                    // this.state.success ? console.log(this.state.success.message) : null
                    this.state.success ? 
                        <Card color="warning">
                            <CardBody>
                                {this.state.success.message}
                            </CardBody>
                        </Card> : null
                }
                <Form<credentials> onSubmit={submit} inputs={fields} />
            </>
        )
    }
}