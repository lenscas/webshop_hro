    import * as React from "react";
    import {register,RegisterUser} from "../services/users";
    import BasicPage from "../types/basicComponent";
    import Form, {InputField, FormData} from "../components/form";
    import { retTrue } from "src/funcs/lambdas";

export default class Register extends BasicPage {
    onSubmit(data : FormData<RegisterUser>){
        register(data.values, this.props.APIS.req);
    }
    render(){
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
        return <Form<RegisterUser> onSubmit={onSubmit} inputs={fields}/>
    }
}