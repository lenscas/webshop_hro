import * as React from "react";
import { props } from "src/types/BasicProps";
import BasicPage from "src/types/basicComponent";
import { apiUrl } from 'src/config';
import "../style/admin.css";
//import { userInfo } from "os";
 import Button from "reactstrap/lib/Button";
//import { readLocalRaw } from "src/services/localStorage";
import { APIReturn } from "src/services/basics";
import { UserData } from "src/services/users";
import LoadSymbol from "src/components/loadSymbol";

export default class Admin extends BasicPage<props, { render: string, users: UserData[] | undefined }> {

    tabClasses: { [key: string]: string } = { Hangfire: "nav-link active", Edit: "nav-link", Create: "nav-link", Delete: "nav-link" }

    constructor(propsy) {
        super(propsy);

        this.state = {
            render: "Hangfire",
            users: undefined
        }
        this.renderDelete = this.renderDelete.bind(this)
    }
    async getUsers() {
        return await (
            this.props.APIS.req.buildRequest("path", `api/admin/users`)
                .buildRequest("method", "GET")
                .buildRequest("converter", (t: APIReturn<UserData[]>) => (t.data)
                ).run<UserData[]>())
    }

    userDeleteOnClick(userId: number) {
        return () =>this.usersDelete(userId)
    }

    usersDelete = async (userId : number) => {
        return await (
            this.props.APIS.req.buildRequest("path", `api/admin/users/${userId}`)
                .buildRequest("method", "DELETE")
                .buildRequest("converter", (t: APIReturn<UserData[]>) => (t.data)
                ).run<UserData[]>())
    }
    // async componentDidMount() {
    //     console.log(await this.getUsers())
    //     const users = await this.getUsers()
    //     if (users) {
    //         this.setState({
    //             ...this.state,
    //             users
    //         })
    //     }

    // }
    renderDelete(users: UserData[]) {
        return (
            <div>
                {
                    users.map((v) => {
                        return <table key={v.id}>
                                <tr>
                                    <th>UserName</th>
                                    <br/>
                                    <th>Email</th>
                                    <br/>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                <td>{v.name}</td>
                                <br/>
                                <td>{v.email}</td>
                                <br/>
                                <td><Button onClick={this.userDeleteOnClick(v.id)} >Delete</Button></td>
                                </tr>
                            </table>
                                
                    })
                    
                } 
            </div>
        )
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

        const fetch = async () => await this.getUsers()

        switch (this.state.render) {
            case "Hangfire":
                return this.renderHangfire()
            case "Create":
                return <p>create</p>
            case "Delete":
                return <LoadSymbol<{}, UserData[] | undefined>
                    toRender={this.renderDelete}
                    params={{}}
                    getData={fetch}
                />
            default:
                return <p>No page</p>
        }
    }

}