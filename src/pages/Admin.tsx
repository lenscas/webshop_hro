import * as React from "react";
import { props } from "src/types/BasicProps";
import BasicPage from "src/types/basicComponent";
import "../style/admin.css";
import Stock from "./Stock";
import { AdminUserCreate } from "src/components/adminUserCreate";
import { AdminUserDeleteEdit } from "src/components/adminUserDeleteEdit";
import Hangfire from 'src/components/Hangfire';
import { readLocalRaw } from "src/services/localStorage";
import { Redirect } from "react-router";

export default class Admin extends BasicPage<props, { render: string}> {

    // tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link",Stock: "nav-link" }
    tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link", Create: "nav-link", Delete: "nav-link", Stock: "nav-link" }

    constructor(propsy) {
        super(propsy);

        this.state = {
            render: "Hangfire",
        }
    }
    
    renderHangfire() {
        return (
            <Hangfire APIS={this.props.APIS}/>
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
        const role = readLocalRaw('role')
        if(role !== 'Admin') {
            return <Redirect to="/"/>
        }

        return (
            <div className="mainAdmin">
                <div className="tabs">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button color="secondary" className={this.tabClasses.Hangfire} onClick={this.setTabOnClick("Hangfire")} >Manage updates</button>
                        </li>

                        <li className="nav-item">
                            <button className={this.tabClasses.Create} onClick={this.setTabOnClick("Create")} >Create users</button>
                        </li>
                        <li className="nav-item">
                            <button className={this.tabClasses.Delete} onClick={this.setTabOnClick("Delete")} >Edit / Delete users</button>
                        </li>
                        <li className="nav-item">
                            <button className={this.tabClasses.Stock} onClick={this.setTabOnClick("Stock")} >Manage stock</button>
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
            case "Edit":
                return <p>Edit</p>
            case "Stock":
                return <Stock APIS={this.props.APIS}/>
            case "Create":
                return <AdminUserCreate APIS={this.props.APIS}/>
            case "Delete":
                return <AdminUserDeleteEdit APIS={this.props.APIS}/>
            default:
                return <p>No page</p>
        }
    }

}