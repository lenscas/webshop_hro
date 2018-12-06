import * as React from "react";
import BasicComponent from "../types/basicComponent";
import LoadSymbol from "src/components/loadSymbol";
//import { Table } from 'reactstrap';
import { props } from "src/types/BasicProps";
//import { readLocalRaw, storeLocal } from "src/services/localStorage";
import { getUserData, UserData, Address } from "src/services/users";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import Button from "reactstrap/lib/Button";
import Form from "reactstrap/lib/Form";

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
        if(id === "Edit"){
            return(
                <div>
                    <h5>Change Details</h5>
                    <Form>
                        <FormGroup>
                            <Label for="email">Name</Label>
                            <Input type="email" name="email" id="email" placeholder={userData.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="approach">Approach</Label>
                            <Input name="approach" id="approach" placeholder = {userData.approach} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input name="name" id="name" placeholder = {userData.name} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder = "Please input your password" />
                        </FormGroup>

                        <Button>Submit</Button>
                    </Form>
                    <br/>
                    <h5>Add Address</h5>
                    <Form>
                        <FormGroup>
                            <Label for="street">Street</Label>
                            <Input name="street" id="street" placeholder = "e.g. Lullaby Lane" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="number">Number</Label>
                            <Input name="number" id="number" placeholder = "e.g. 135" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="zipCode">Zip Code</Label>
                            <Input name="zipCode" id="zipCode" placeholder = "e.g. 9753AB" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input name="city" id="city" placeholder = "Zwammerdam" />
                        </FormGroup>

                        <Button>Add</Button>
                    </Form>
                    <br/>
                    <h5>Change Password</h5>
                    <Form>
                        
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="newPassword" id="newPassword" placeholder = "Please input a strong password" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="repeatPassword" id="repeatPassword" placeholder = "Please repeat your password" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder = "Please input your current password" />
                        </FormGroup>

                        <Button>Submit</Button>
                    </Form>
                    <br/>

                    <Button>Remove All Addresses</Button>
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