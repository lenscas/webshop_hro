import * as React from "react";
import { props } from "src/types/BasicProps";
import BasicPage from "src/types/basicComponent";

import { apiUrl } from 'src/config';
import "../style/admin.css";
import { APIReturn } from "src/services/basics";
import { RegisterUserAsAdmin } from "src/services/users";
import Form, {InputField, FormData} from "../components/form";
import { retTrue } from "src/funcs/lambdas";

type registerState = {
    success? : boolean | {success: boolean, message}
}

export default class Admin extends BasicPage<props, { render: string } & registerState> {

    tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link", Create: "nav-link", Delete: "nav-link"  }

    constructor(propsy) {
        super(propsy);
        this.state = {
            render: "Hangfire"
        }
    }
    async onSubmit(data : FormData<RegisterUserAsAdmin>){
        console.log(data)
        await (
           this.props.APIS.req.buildRequest("path",`api/admin/users/`)
           .buildRequest("method", "POST")
           .buildRequest("body",{user: data.values})
           .buildRequest("converter",(t:APIReturn<boolean>)=>({success : t.success}))
       ).run<{success: boolean}>()
    }

    renderHangfire() {
        return (
            <div className="con">

                <iframe src={apiUrl + "hangfire"} className="hangfire" />
            </div>
        )
    }
    renderCreate(){

        if(this.state.success !== true){
            const fields : InputField[]= [
                {
                    type:"text",
                    validator:retTrue,
                    name : "name",
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
                    label : "Approach",
                    placeholder: "Mr. / Mrs.",
                    id : "honorific"
                },
                {
                    type:"text",
                    validator:retTrue,
                    name : "role",
                    label : "Role",
                    placeholder: "Admin or User",
                    id : "honorific"
                },
                {
                    name : "Submit",
                    placeholder: "Submit",
                    id : "submit",
                    type : "button"
                }
            ]
            const onSubmit =(data :FormData<RegisterUserAsAdmin> )=>this.onSubmit(data)
            return <>
                <Form<RegisterUserAsAdmin> onSubmit={onSubmit} inputs={fields}/>
            </>
        }return "Oops, something went wrong, try again later"
    }

    setTabOnClick(id: string) {
        return () => this.setTab(id)
    }

    setTab(id: string) {
        this.tabClasses[id] = "nav-link active"
        Object.keys(this.tabClasses).filter((v) => v !== id).forEach((tabId) => this.tabClasses[tabId] = "nav-link")
        this.easySetState({ render: id })
    }

    render () {

        return (
            <div className="mainAdmin">
                <div className="tabs">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button className={this.tabClasses.Hangfire} onClick={this.setTabOnClick("Hangfire")} >hangfire</button>
                        </li>

                        <li className="nav-item">
                            <button className={this.tabClasses.Create} onClick={this.setTabOnClick("Create")} >Create</button>
                        </li>
                        <li className="nav-item">
                            <button className={this.tabClasses.Edit} onClick={this.setTabOnClick("Edit")} >Edit</button>
                        </li>
                        <li className="nav-item">
                            <button className={this.tabClasses.Delete} onClick={this.setTabOnClick("Delete")} >Delete</button>
                        </li>
                    </ul>
                </div>

                {this.renderScreen()}

            </div>

        )
    }

    renderScreen = () => {
        switch (this.state.render) {
            case "Hangfire":
                return this.renderHangfire()
            case "Create":
                return this.renderCreate()
            case "Edit":
                return this.renderCreate()
            default:
                return <p>No page</p>
        }
    }

}