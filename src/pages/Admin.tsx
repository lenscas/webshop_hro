import * as React from "react";
import { props } from "src/types/BasicProps";
import { apiUrl } from 'src/config';
import "../style/admin.css";
// import { APIReturn } from "src/services/basics";
// import { RegisterUserAsAdmin } from "src/services/users";
// import Form, {InputField, FormData} from "../components/form";
// import { retTrue } from "src/funcs/lambdas";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BasicComponent from "src/types/smallComponent";
import { AdminUserCreate } from "src/components/adminUserCreate";

type registerState = {
    success? : boolean | {success: boolean, message}
}
type accountState = {modal: boolean}

export default class Admin extends BasicComponent<props, { render: string } & registerState & accountState> {

    tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link", Create: "nav-link", Delete: "nav-link"  }
    
    constructor(propsy) {
        super(propsy);
        this.state = {
            render: "Hangfire",
            modal: false
        };
        // this.AccountMade = this.AccountMade.bind(this);
    }

    renderHangfire() {
        return (
            <div className="con">

                <iframe src={apiUrl + "hangfire"} className="hangfire" />
            </div>
        )
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
                return <AdminUserCreate APIS={this.props.APIS}/>
            case "Edit":
                return <p>edit</p>
            default:
                return <p>No page</p>
        }
    }

}