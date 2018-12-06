import * as React from "react";
import BasicComponent from "../types/basicComponent";
import LoadSymbol from "src/components/loadSymbol";
//import { Table } from 'reactstrap';
import { props } from "src/types/BasicProps";
//import { readLocalRaw, storeLocal } from "src/services/localStorage";
import { getUserData, UserData, Address } from "src/services/users";

export default class UserPage extends BasicComponent<props, {render : string}>{
    
    tabClasses : {[key:string] : string} = {Details : "nav-link active", Edit : "nav-link"}

    constructor(propsy) {
        super(propsy);
        this.state = { render : "Details" }
        this.renderUserData = this.renderUserData.bind(this)
        this.renderAddresses = this.renderAddresses.bind(this)
    }

    renderAddresses(addresses : Address[]){
        const rows : JSX.Element[] = []
        const row : Address[] = []
        console.log(addresses)
        addresses.forEach( (address, i) => {
            row.push(address)
            console.log(row)
            if (row.length === 4){
                rows.push(
                    <tr>
                    {row.map( (addressItem,j) => (!addressItem) ? <h1>lol</h1> :
                            <td key={addressItem.zipCode}>
                                <div className = "card">
                                    <div className="card-body">
                                        <h5 className="card-title"> Address {i - (4-j) + 2} </h5>
                                        <div className="card-text">
                                            <p>{addressItem.street} {addressItem.number}</p>
                                            <p>{addressItem.zipCode} {addressItem.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>)}
                        </tr>
                )
                row.length = 0
            }
        })
        rows.push(
            <tr>
            {row.map( (addressItem,j) => (!addressItem) ? <h1>lol</h1> :
                    <td key={addressItem.zipCode}>
                        <div className = "card">
                            <div className="card-body">
                                <h5 className="card-title"> Address {(Math.floor(addresses.length/4)) * 4 + j + 1} </h5>
                                <div className="card-text">
                                    <p>{addressItem.street} {addressItem.number}</p>
                                    <p>{addressItem.zipCode} {addressItem.city}</p>
                                </div>
                            </div>
                        </div>
                    </td>)}
                </tr>
        )
        return rows
    
        //groupedAddresses = 

        // return (
        // <tr key={rows}>
        //         <td>
        //             <div className = "card">
        //                 <div className="card-body">
        //                     <h5 className="card-title"> Address {i + 1} </h5>
        //                     <p className="card-text">
        //                         <div>{address.street} {address.number}</div>
        //                         <div>{address.zipCode} {address.city}</div>
        //                     </p>
        //                 </div>
        //             </div>
        //         </td>
        //     </tr> ) 
    }

    setTabOnClick(id: string){
    return ()=> this.setTab(id)
    }

    setTab(id: string){
        this.tabClasses[id] = "nav-link active"
        Object.keys(this.tabClasses).filter((v) => v !== id).forEach( (tabId) => this.tabClasses[tabId] = "nav-link" )
        this.easySetState( { render:id })
    }
    
    renderTab(id: string, userData: UserData){
        if(id === "Details"){
            return(
            <div>
                <div>{userData.approach} {userData.name}</div>
                <div>{userData.email}</div>
                    <div>
                        <table>
                        <tbody>
                        <tr>
                        <th>My addresses:</th>
                        </tr>
                        {this.renderAddresses(userData.addresses)}
                        </tbody>
                        </table>
                    </div>
            </div>
            )
        }
        else{
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
                <button className={this.tabClasses.Details} onClick = {this.setTabOnClick("Details")}>Details</button>
            </li>
            
            <li className="nav-item">   
                <button className={this.tabClasses.Edit} onClick = {this.setTabOnClick("Edit")}>Edit</button>
            </li>
            </ul>
        
            <div className="tab-pane container active" id = "userData">   
              {this.renderTab(this.state.render, userData)}
            </div>
        </div>
        )
    }

    render() {
        const fetch = async () => await getUserData(this.props.APIS.req)

        return <LoadSymbol<{}, UserData | undefined>
            toRender={this.renderUserData}
            params={{}}
            getData={fetch}
        />
    }

}