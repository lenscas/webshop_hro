import * as React from "react";
import LoadSymbol from "src/components/loadSymbol";
import { props } from "src/types/BasicProps";
import { getUserData, UserData} from "src/services/users";
import BasicPage from "../types/basicComponent";
import UserDetail from "src/components/UserDetail";
import HistoryPage from "src/components/History";

export default class UserPage extends BasicPage<props, {render: string}>{

    tabClasses: { [key: string]: string } = { Details: "nav-link active", History: "nav-link" }

    editClasses: { [key: string]: string } = { changeDetails: "visible", addAddress: "hidden", changePassword: "hidden" }

    constructor(propsy) {
        super(propsy);
        this.state = { render: "Details"}
        this.renderUserData = this.renderUserData.bind(this)
    }

    setTabOnClick(id: string) {
        return () => this.setTab(id)
    }

    setTab(id: string) {
        this.tabClasses[id] = "nav-link active"
        Object.keys(this.tabClasses).filter((v) => v !== id).forEach((tabId) => this.tabClasses[tabId] = "nav-link")
        this.easySetState({ render: id })
    }

    setEdit(id: string) {
        this.editClasses[id] = "visible"
        Object.keys(this.editClasses).filter((v) => v !== id).forEach((editId) => this.editClasses[editId] = "hidden")
        this.easySetState({ render: this.state.render })
    }

    setTabAndEdit(tabId: string, editId: string) {
        this.setEdit(editId)
        this.setTab(tabId)
    }



    renderTab(id: string, userData: UserData, update: (params: {}) => Promise<void>) {
        console.log(id)
        if (id === "Details") {
            return <UserDetail APIS={this.props.APIS} userdata={userData} update={update}/>
        } else if(id === "History") {
            return <HistoryPage APIS={this.props.APIS}/>
        }
        else {
            return <div>Sorry, we couldn't find what you're looking for...</div>
        }
    }

    renderUserData(userData: UserData, update: (params: {}) => Promise<void>) {
        if (!userData) {
            return <></>
        }

        return (
            <div>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <button className={this.tabClasses.Details} onClick={this.setTabOnClick("Details")}>Details</button>
                    </li>

                    <li className="nav-item">
                        <button className={this.tabClasses.History} onClick={this.setTabOnClick("History")}>History</button>
                    </li>
                </ul>

                <div className="tab-pane container active" id="userData">
                    {this.renderTab(this.state.render, userData, update)}
                </div>
            </div>
        )
    }

    render() {
        console.log('render')
        const fetch = async () => await getUserData(this.props.APIS.req)

        return <LoadSymbol<{}, UserData | undefined>
            toRender={this.renderUserData}
            params={{}}
            getData={fetch}
        />
    }

}