import * as React from "react";
import {register,RegisterUser} from "../services/users";
import BasicPage from "../types/basicComponent";
import Form, {InputField, FormData} from "../components/form";
import { retTrue } from "src/funcs/lambdas";
import { Redirect } from "react-router";
import { props } from "src/types/BasicProps";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";

type registerState = {
    success? : boolean | {success: boolean, message}
}
export default class Register extends BasicPage<props,registerState> {
    constructor(propsy){
        super(propsy)
        this.state = {}
    }
    async onSubmit(data : FormData<RegisterUser>){
        const res = await register(data.values, this.props.APIS.req);
        if(res === false || res===true){
            this.easySetState({success:res})
        } else if(res === undefined){
            this.easySetState({success: false})
        } else {
            this.easySetState({success:res})
        }
    }
    render(){
        if(this.props.APIS.userId){
            return <Redirect to="/"/>
        }
        let warnings = <></>
        if(this.state.success !== undefined){
            if(this.state.success ===false){
                warnings = (
                    <Card color="warning">
                        <CardBody>
                            Something wend wrong, please try again later.
                        </CardBody>
                    </Card>
                )
            } else if (this.state.success !== true  && this.state.success.success === false){
                warnings = (
                    <Card color="warning">
                        <CardBody>
                            {this.state.success.message}
                        </CardBody>
                    </Card>
                )
            } else if (this.state.success){
                warnings = (
                    <Card color="success">
                        <CardBody>
                            An E-mail has been sent to activate your account.
                        </CardBody>
                    </Card>
                )
            }
        }
        
        if(this.state.success !== true){
            const fields : InputField[]= [
                {
                    type:"text",
                    validator:retTrue,
                    name : "username",
                    label : "Username",
                    placeholder: "Username",
                    id : "username",
                },
                {
                    validator:retTrue,
                    name : "email",
                    label : "E-mail",
                    placeholder: "name@example.com",
                    id : "e-mail",
                    type: "email"
                },
                {
                    validator:retTrue,
                    name : "password",
                    label : "Password",
                    placeholder: "Password",
                    id : "password-checker",
                    type: "password"
                },
                {
                    validator:retTrue,
                    name : "repeatPassword",
                    label : "Repeat password",
                    placeholder: "Repeat password",
                    id : "password",
                    type: "password"
                },
                {
                    type:"text",
                    validator:retTrue,
                    name : "approach",
                    label : "Title",
                    placeholder: "Mr. / Mrs.",
                    id : "honorific"
                },
                {
                    name : "Submit",
                    placeholder: "Submit",
                    id : "submit",
                    type : "button"
                }
            ]
            const onSubmit =(data :FormData<RegisterUser> )=>this.onSubmit(data)
            return <>
                {warnings}
                <Form<RegisterUser> onSubmit={onSubmit} inputs={fields}/>
            </>
        } else {
            return warnings
        }        
    }
}