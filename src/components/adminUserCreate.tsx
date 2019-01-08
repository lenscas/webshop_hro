import BasicComponent from "src/types/smallComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import Form, { InputField, FormData } from "../components/form";
import { RegisterUserAsAdmin } from "src/services/users";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import { retTrue } from "src/funcs/lambdas";
import { APIReturn } from "src/services/basics";


export class AdminUserCreate extends BasicComponent<props, { success?: boolean | { success: boolean, message: string } }>{
    fields: InputField[] = [
        {
            type: "text",
            validator: retTrue,
            name: "name",
            label: "Username",
            placeholder: "Username",
            id: "username",
        },
        {
            validator: retTrue,
            name: "email",
            label: "E-mail",
            placeholder: "name@example.com",
            id: "e-mail",
            type: "email"
        },
        {
            validator: retTrue,
            name: "password",
            label: "Password",
            placeholder: "Password",
            id: "password-checker",
            type: "password"
        },
        {
            validator: retTrue,
            name: "repeatPassword",
            label: "Repeat password",
            placeholder: "Repeat password",
            id: "password",
            type: "password"
        },
        {
            type: "select",
            // validator: retTrue,
            options: ["Mr.", "Mrs."],
            name: "approach",
            label: "Title",
            placeholder: "Mr. / Mrs.",
            id: "honorific"
        },
        {
            type: "select",
            // validator: retTrue,
            options: ["User", "Admin"],
            name: "role",
            label: "Role",
            placeholder: "Admin or User",
            id: "role"
        },
        {
            name: "Submit",
            placeholder: "Submit",
            id: "submit",
            type: "button"
        }
    ]
    constructor(propsy) {
        super(propsy)
        this.state = {}
    }
    async onSubmit(data: FormData<RegisterUserAsAdmin>) {
        console.log(data.values)
        const res = await (
            this.props.APIS.req.buildRequest("path", `api/admin/users`)
                .buildRequest("method", "POST")
                .buildRequest("body", data.values)
                .buildRequest("converter", (t: APIReturn<boolean>) => ({ success: t.success }))
        ).run<{ success: boolean }>()
        if (res) {
            this.easySetState({ success: res.success })
        }
    }


    render() {

        let warnings = <></>
        if (this.state.success !== undefined) {
            if (this.state.success === false) {
                warnings = (
                    <Card color="warning">
                        <CardBody>
                            Something wend wrong, please try again later.
                        </CardBody>
                    </Card>
                )
            } else if (this.state.success !== true && this.state.success.success === false) {
                warnings = (
                    <Card color="warning">
                        <CardBody>
                            {this.state.success.message}
                        </CardBody>
                    </Card>
                )
            } else if (this.state.success) {
                this.easySetState({success: undefined})
                warnings = (
                    <Card color="success">
                        <CardBody>
                            Account is succesfully made!
                        </CardBody>
                    </Card>
                )
            }
        }


        
        const onSubmit = (data: FormData<RegisterUserAsAdmin>) => this.onSubmit(data)
        return <>
            {warnings}
            <Form<RegisterUserAsAdmin> onSubmit={onSubmit} inputs={this.fields} />
        </>

    }
}
