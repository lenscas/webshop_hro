import * as React from "react";
import BasicComponent from "../types/basicComponent";
import LoadSymbol from "src/components/loadSymbol";
//import { Table } from 'reactstrap';
import { props } from "src/types/BasicProps";
import { getUserData, UserData, Address } from "src/services/users";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import Button from "reactstrap/lib/Button";
import Form from "reactstrap/lib/Form";
import { storeLocal, readLocal } from "src/services/localStorage";

export default class UserPage extends BasicComponent<props, {render : string, page : number, selectingDefaultAddress : boolean}>{
    
    tabClasses : {[key:string] : string} = {Details : "nav-link active", Edit : "nav-link"}

    constructor(propsy) {
        super(propsy);
        this.state = { render : "Details", page : 0, selectingDefaultAddress : false}
        this.renderUserData = this.renderUserData.bind(this)
        this.renderAddresses = this.renderAddresses.bind(this)
    }

    renderAddresses(addresses : Address[], rowLength : number, pageLength : number, width : string, short : boolean){
        //storeLocal("defaultAddress", addresses[0])
        console.log("Addresses from DB")
        console.log(addresses)
        const rows : JSX.Element[] = []
        const row : Address[] = []
        
        const addressButton = (addressItem) => {
            if (this.state.selectingDefaultAddress){
                return (
                    <Button color = "primary" onClick = {this.setDefaultOnClick(addressItem)}>Select</Button>
                )
            }
            return <Button>Delete</Button>
        }

        

        let page = this.state.page
        if (page === 0){
            page++
        }
        addresses.forEach( (address, i) => {
            if ((page - 1) * pageLength < i++ && i++ <= (page * pageLength) + 1){
                row.push(address)
            }
            
            if (row.length === rowLength){
                rows.push(
                    <tr>
                    {row.map( (addressItem,j) => (!addressItem) ? <h1>lol</h1> :
                        <td key={addressItem.id}>
                            <div className = "card" style = {{"width" : width, "height" : "12rem"}}>
                                <div className="card-body">
                                    <div className="card-text float-left">
                                        <p>{addressItem.street} {addressItem.number}</p>
                                        <p>{addressItem.zipCode}</p>
                                        <p>{addressItem.city}</p>
                                        {addressButton(addressItem)}
                                    </div>
                                </div>
                            </div>
                        </td>)}
                    </tr>
                )
                if (!short){
                row.length = 0
                }
            }
        })
        if (!short){
            rows.push(
                <tr>
                {row.map( (addressItem,j) => (!addressItem) ? <h1>lol</h1> :
                    <td key={addressItem.id}>
                        <div className = "card" style = {{"width" : width, "height" : "12rem"}}>
                            <div className="card-body">
                                <div className="card-text float-left">
                                    <p>{addressItem.street} {addressItem.number}</p>
                                    <p>{addressItem.zipCode}</p>
                                    <p>{addressItem.city}</p>
                                    <Button>Delete</Button>
                                </div>
                            </div>
                        </div>
                    </td>)}
                </tr>
            )
            const addButton = <Button className="float-left">Add</Button>
           
            const viewLessButton = <Button className="float-right"  onClick = {this.modPageOnClick(-(this.state.page))}>View Less</Button>
            
            let prevButton = <td/>
            let nextButton = <td/>
            if (this.state.page > 1){
                prevButton = <Button className="float-left" onClick = {this.modPageOnClick(-1)}>Prev Page</Button> 
            }
            if (this.state.page < (addresses.length / pageLength)){
                nextButton = <Button className="float-right" onClick = {this.modPageOnClick(1)}>Next Page</Button>
            }
            const middle : JSX.Element[] = []
            for (let i = 0; i < (rowLength - 2); i++){
                middle.push(<td/>)}
            rows.push(
                <tr>
                    {prevButton}
                    {middle}
                    {nextButton}
                </tr>
            )
            rows.push(
                <tr>
                    {addButton}
                    {middle}
                    {viewLessButton}
                </tr>
            )
        }
        console.log("Generated address table")
        console.log(rows)
        return rows
    }

    modPageOnClick(pageMod: number){
        return ()=> this.modPage(pageMod)
    }

    setTabOnClick(id: string){
    return ()=> this.setTab(id)
    }
    
    setDefaultOnClick(address: Address){
        
        return ()=> this.setDefault(address)
    }

    setDefault(address: Address){
        this.setSelect(false)
        storeLocal("defaultAddress", address)
    }

    setSelectOnClick(selectingDefAddress : boolean){
        return ()=> this.setSelect(selectingDefAddress)
    }

    setSelect(selectingDefAddress : boolean){
        this.easySetState( {selectingDefaultAddress : selectingDefAddress})
    }

    setTab(id: string){
        this.tabClasses[id] = "nav-link active"
        Object.keys(this.tabClasses).filter((v) => v !== id).forEach( (tabId) => this.tabClasses[tabId] = "nav-link" )
        this.easySetState( { render:id })
    }

    modPage(pageMod:number){
        this.easySetState( { page : this.state.page + pageMod })
    }
    
    renderTab(id: string, userData: UserData){
        if(id === "Details"){
            let columns = 3;
            const perPage = 8;
            let shorten = true;
            let shortenButtons = <div  className="float-right">
                    <div><Button>Add</Button></div>
                    <div><Button onClick = {this.modPageOnClick(1)}>View More</Button></div>
            </div>;
            if(this.state.page > 0)
            {
                columns = 4;
                shorten = false;
                shortenButtons = <div/>
            }
            const defaultAddress : Address|undefined = readLocal("defaultAddress")
            let defaultAddressView = (
                <div>
                    <div className = "card">
                        <div className="card-body">
                            <div className="card-text float-left">
                                <b>You don't have a default address set!</b>
                                <p>Press select to pick one now.</p>
                                <Button onClick = {this.setSelectOnClick(true)}>Select</Button>
                            </div>
                        </div>
                    </div>
                </div>)
            if (this.state.selectingDefaultAddress){
                defaultAddressView = (
                    <div>
                    <div className = "card">
                        <div className="card-body">
                            <div className="card-text float-left">
                                <b>You don't have a default address set!</b>
                                <p>Please select an address or press cancel.</p>
                                <Button onClick = {this.setSelectOnClick(false)}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            if (defaultAddress !== undefined){
                defaultAddressView = (
                    <div>
                        <div className = "card">
                            <div className="card-body">
                                <div className="card-text float-left">
                                    <b>Your Default Address:</b>
                                    <p>{defaultAddress.street} {defaultAddress.number}</p>
                                    <p>{defaultAddress.zipCode}</p>
                                    <p>{defaultAddress.city}</p>
                                </div>
                                <div className="d-flex flex-column float-right" style = {{"width" : "4rem"}}>
                                    <Button className="justify-content-start" style = {{"margin-bottom" : "2rem", "margin-top" : "2rem"}}>Edit</Button>
                                    <Button className="justify-content-end">Delete</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            return( 
            <div>
                <h4><b>Welcome, {userData.approach} {userData.name}!</b></h4>
                    <div>
                        <div  className="d-flex flex-row">
                            {defaultAddressView}
                            <div>
                                <div className = "card">
                                    <div className="card-body">
                                        <div className="card-text float-left">
                                            <b>Your Details:</b>
                                            <p>Title: {userData.approach}</p>
                                            <p>Name: {userData.name}</p>
                                            <p>E-Mail: {userData.email}</p>
                                        </div>
                                        <div className="d-flex flex-column float-right" style = {{"width" : "4rem"}}>
                                            <Button className="justify-content-start" style = {{"margin-bottom" : "2rem", "margin-top" : "2rem"}}>Edit</Button>
                                            <Button className="justify-content-end">Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table>
                        <tbody>
                            <tr><th>All Addresses:</th></tr>
                            <div className = "float-left">
                            {this.renderAddresses(userData.addresses, columns, perPage, "12rem", shorten)}
                            </div>
                            {shortenButtons}
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