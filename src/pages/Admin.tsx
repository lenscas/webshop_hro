import * as React from "react";
import { props } from "src/types/BasicProps";
import BasicPage from "src/types/basicComponent";
import { apiUrl } from 'src/config';
import "../style/admin.css";
import { AdminUserCreate } from "src/components/adminUserCreate";
import { AdminUserDeleteEdit } from "src/components/adminUserDeleteEdit";

export default class Admin extends BasicPage<props, { render: string}> {

    tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link", Create: "nav-link", Delete: "nav-link" }

    constructor(propsy) {
        super(propsy);

        this.state = {
            render: "Hangfire",
        }
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

    render() {

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
                            <button className={this.tabClasses.Delete} onClick={this.setTabOnClick("Delete")} >Edit / Delete</button>
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
            case "Delete":
                return <AdminUserDeleteEdit APIS={this.props.APIS}/>
            default:
                return <p>No page</p>
        }
    }

}