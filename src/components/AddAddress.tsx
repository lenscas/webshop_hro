import * as React from "react";
import { Address } from "../services/users";
import BasicPage from "../types/basicComponent";
import Form, { InputField, FormData } from "../components/form";
import { retTrue } from "src/funcs/lambdas";
import { props } from "src/types/BasicProps";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";
import { APIReturn } from "src/services/basics";
// import { APIReturn } from "src/services/basics";

type registerState = {
    success?: boolean | { success: boolean, message }
}

export default class AddAddress extends BasicPage<props & { succes: () => void }, registerState> {
    constructor(propsy) {
        super(propsy)
        this.state = {}
    }
    async onSubmit(data: FormData<Address>) {
        data.values.main = false
        const res = await (
            this.props.APIS.req.buildRequest("path", "api/address")
                .buildRequest("method", "POST")
                .buildRequest("body", data.values)
                .buildRequest("converter", (t: APIReturn<boolean>) => ({ success: t.success }))
        ).run<{ success: boolean }>()
        if (res) {
            if (res.success) {
                this.props.succes()
                console.log('hallo??')
            } else {
                this.setState({
                    ...this.state,
                    success: false
                })
            }

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
            }
        }

        if (this.state.success !== true) {
            const fields: InputField[] = [
                {
                    type: "text",
                    validator: retTrue,
                    name: "street",
                    label: "street",
                    placeholder: "Street",
                    id: "street",
                },
                {
                    validator: retTrue,
                    name: "number",
                    label: "Number",
                    placeholder: "Number",
                    id: "number",
                    type: "number"
                },
                {
                    validator: retTrue,
                    name: "zipcode",
                    label: "Zipcode",
                    placeholder: "Zipcode",
                    id: "zipcode",
                    type: "text"
                },
                {
                    validator: retTrue,
                    name: "city",
                    label: "City",
                    placeholder: "City",
                    id: "city",
                    type: "text"
                },
                {
                    name: "Submit",
                    placeholder: "Save",
                    id: "submit",
                    type: "button"
                }
            ]
            const onSubmit = (data: FormData<Address>) => this.onSubmit(data)
            return <>
                {warnings}
                <Form<Address> onSubmit={onSubmit} inputs={fields} />
            </>
        } else {
            return warnings
        }
    }
}