import * as React from "react";
import { props } from "src/types/BasicProps";
import BasicPage from "src/types/basicComponent";

import { apiUrl } from 'src/config';
import "../style/admin.css";
import Button from "reactstrap/lib/Button";
import { getCard } from "src/services/product";



export default class Admin extends BasicPage<props, { render: string }> {
    

    tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link" , Users: "nav-link", Stock: "nav-link", Create: "nav-link", Delete: "nav-link"}

    constructor(propsy) {
        super(propsy);
        this.state = {
            render: "Hangfire"
        }
    }

    renderHangfire() {
        return (
            <div className="con">
                <Button className="Secondary prijs">Prices</Button>
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
        /*Insertcardprice UpdateStock*/ 
        return (
            <div className="mainAdmin">
                <div className="tabs">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Button color="secondary" className={this.tabClasses.Hangfire} onClick={this.setTabOnClick("Hangfire")} >hangfire</Button>
                        </li>
                        <li className="nav-item">
                            <Button className={this.tabClasses.Stock} onClick={this.setTabOnClick("Stock")} >Stock</Button>
                        </li>
                        <li className="nav-item">
                            <Button className={this.tabClasses.Users} onClick={this.setTabOnClick("Users")} >Users</Button>
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
            case "Users":
                return <div>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <Button className={this.tabClasses.Create} onClick={this.setTabOnClick("Create")} >Create</Button>
                            </li>
                            <li className="nav-item">
                                <Button className={this.tabClasses.Edit} onClick={this.setTabOnClick("Edit")} >Edit</Button>
                            </li>
                            <li className="nav-item">
                                <Button className={this.tabClasses.Delete} onClick={this.setTabOnClick("Delete")} >Delete</Button>
                            </li>
                        </ul>
                       </div>
            case "Stock":
                return <p>Je krijgt meer producten</p>
            case "Create":
               return<div>
                        <div>
                            <ul className="nav nav-pills">
                                <li className="nav-item">
                                    <Button className={this.tabClasses.Edit} onClick={this.setTabOnClick("Edit")} >Edit</Button>
                                </li>
                                <li className="nav-item">
                                    <Button className={this.tabClasses.Delete} onClick={this.setTabOnClick("Delete")} >Delete</Button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p>testst</p>
                        </div>
                    </div>
            case "Edit":
             return <div>
                        <div>
                            <ul className="nav nav-pills">
                                <li className="nav-item">
                                    <Button className={this.tabClasses.Create} onClick={this.setTabOnClick("Create")} >Create</Button>
                                </li>
                                <li className="nav-item">
                                    <Button className={this.tabClasses.Delete} onClick={this.setTabOnClick("Delete")} >Delete</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
            case "Delete":
             return <div>
                        <div>
                            <ul className="nav nav-pills">
                                <li className="nav-item">
                                    <Button className={this.tabClasses.Create} onClick={this.setTabOnClick("Create")} >Create</Button>
                                </li>
                                <li className="nav-item">
                                    <Button className={this.tabClasses.Edit} onClick={this.setTabOnClick("Edit")} >Edit</Button>
                                </li>
                            </ul>
                        </div>
                        <div>
                           <p>{getCard.name}</p>
                        </div>
                    </div>
            default:
                return <p>No page</p>
        }
    }

}