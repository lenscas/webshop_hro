import * as React from "react";
// import BasicComponent from "../types/basicComponent";
import LoadSymbol from "src/components/loadSymbol";
//import { Table } from 'reactstrap';
import { props } from "src/types/BasicProps";
import { getUserData, UserData, Address, updateUser, RegisterUser } from "src/services/users";
// import FormGroup from "reactstrap/lib/FormGroup";
// import Input from "reactstrap/lib/Input";
// import Label from "reactstrap/lib/Label";
import Button from "reactstrap/lib/Button";
import Form, {InputField, FormData} from "../components/form";
import { storeLocal, readLocal, removeLocal } from "src/services/localStorage";
import BasicPage from "../types/basicComponent";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import { retTrue } from "src/funcs/lambdas";

export default class UserPage extends BasicPage<props, {success? : boolean | {success: boolean, message}, render : string, page : number, selectingDefaultAddress : boolean}>{
    
    tabClasses : {[key:string] : string} = {Details : "nav-link active", Edit : "nav-link"}

    editClasses : {[key:string] : string} = {changeDetails : "visible", addAddress : "hidden", changePassword : "hidden"}

    constructor(propsy) {
        super(propsy);
        this.state = { render : "Details", page : 0, selectingDefaultAddress : false}
        this.renderUserData = this.renderUserData.bind(this)
        this.renderAddresses = this.renderAddresses.bind(this)
    }

    async onSubmitChangeDetails(data : FormData<RegisterUser>){
        const res = await updateUser(data.values, this.props.APIS.req);
        if(res === false || res===true){
            this.easySetState({success:res})
        } else if(res === undefined){
            this.easySetState({success: false})
        } else {
            this.easySetState({success:res})
        }
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
            if ((page - 1) * pageLength < i+1 && i+1 <= (page * pageLength)){
                row.push(address)
            }
            
            if (row.length === rowLength){
                rows.push(
                    <tr key = {"a" + i}>
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
                row.length = 0
            }
        })
        
            rows.push(
                <tr key = {"b" + addresses.length}>
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
            const addButton = <td key = {"c"}><Button className="float-left" onClick = {this.setTabAndEditOnClick("Edit", "addAddress")}>Add</Button></td>
           
            const viewLessButton = <td key = {"d"}><Button onClick = {this.modPageOnClick(-(this.state.page))}>View Less</Button></td>
            if (!short){
            let prevButton = <td/>
            let nextButton = <td/>
            if (this.state.page > 1){
                prevButton = <td><Button className="float-left" onClick = {this.modPageOnClick(-1)}>Prev Page</Button></td> 
            }
            if (this.state.page < (addresses.length / pageLength)){
                nextButton = <td><Button className="float-right" onClick = {this.modPageOnClick(1)}>Next Page</Button></td>
            }
            const middle : JSX.Element[] = []
            for (let i = 0; i < (rowLength - 2); i++){
                middle.push(<td key = {"g" + i}/>)}
            rows.push(
                <tr key = {"e"}>
                    {prevButton}
                    {middle}
                    {nextButton}
                </tr>
            )
            rows.push(
                <tr key = {"f"}>
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

    setEditOnClick(id: string){
        return ()=> this.setEdit(id)
    }

    setTabAndEditOnClick(tabId: string, editId: string){
        return ()=> this.setTabAndEdit(tabId, editId)
    }
    
    setDefaultOnClick(address: Address){
        
        return ()=> this.setDefault(address)
    }

    unsetsetDefaultOnClick(){
        
        return ()=> this.unsetDefault()
    }

    setDefault(address: Address){
        this.setSelect(false)
        storeLocal("defaultAddress", address)
    }

    unsetDefault(){
        removeLocal("defaultAddress")
        this.easySetState( {render: this.state.render})
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

    setEdit(id: string){
        this.editClasses[id] = "visible"
        Object.keys(this.editClasses).filter((v) => v !== id).forEach( (editId) => this.editClasses[editId] = "hidden" )
        this.easySetState( {render:this.state.render})
    }

    setTabAndEdit(tabId: string, editId: string){
        this.setEdit(editId)
        this.setTab(tabId)
    }

    modPage(pageMod:number){
        this.easySetState( { page : this.state.page + pageMod })
    }
    
    renderTab(id: string, userData: UserData){
        if(id === "Details"){
            let columns = 3;
            let perPage = 3;
            let shorten = true;
            let shortenButtons = <tr  className="float-right">
                    <td><Button onClick = {this.setTabAndEditOnClick("Edit", "addAddress")}>Add</Button></td>
                    <td><Button onClick = {this.modPageOnClick(1)} >View More</Button></td>
            </tr>;
            if(this.state.page > 0)
            {
                columns = 4;
                perPage = 8;
                shorten = false;
                shortenButtons = <tr/>
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
                                    <Button className="justify-content-start" style = {{"marginBottom" : "2rem", "marginTop" : "2rem"}}>Edit</Button>
                                    <Button className="justify-content-end" onClick = {this.unsetsetDefaultOnClick()}>Unset</Button>
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
                                            <Button className="justify-content-start" style = {{"marginBottom" : "2rem", "marginTop" : "2rem"}} onClick = {this.setTabAndEditOnClick("Edit", "changeDetails")}>Edit</Button>
                                            <Button className="justify-content-end">Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table>
                        <tbody className = "float-left">
                            <tr><th>All Addresses:</th></tr>
  
                            {this.renderAddresses(userData.addresses, columns, perPage, "12rem", shorten)}

                            
                        </tbody>
                        {shortenButtons}
                        </table>
                    </div>
            </div>
            )
        }
        if(id === "Edit"){
            let changeDetailsButtonShow = "hidden"
            //let addAddressButtonShow = "hidden"
            //let changePasswordButtonShow = "hidden"

            if (this.editClasses.changeDetails === "hidden"){
                changeDetailsButtonShow = "visible"
            }
            // if (this.editClasses.addAddress === "hidden"){
            //     addAddressButtonShow = "visible"
            // }
            // if (this.editClasses.changePassword === "hidden"){
            //     changePasswordButtonShow = "visible"
            // }

            let warnings = <></>
            let changeDetailsForm = <></>
            if(this.state.success !== undefined){
                if(this.state.success ===false){
                    warnings = (
                        <Card color="warning">
                            <CardBody>
                                Something wend wrong, please try again later.
                            </CardBody>
                        </Card>
                    )
                } else if (this.state.success !== true  && this.state.success.success === false){
                    warnings = (
                        <Card color="warning">
                            <CardBody>
                                {this.state.success.message}
                            </CardBody>
                        </Card>
                    )
                } else if (this.state.success){
                    warnings = (
                        <Card color="success">
                            <CardBody>
                                Your details have been successfully updated.
                            </CardBody>
                        </Card>
                    )
                }
            }
            if(this.state.success !== true){
                const changeDetailsFields : InputField[]= [
                    {
                        type:"text",
                        validator:retTrue,
                        name : "username",
                        label : "Username",
                        placeholder: userData.name,
                        id : "username",
                    },
                    {
                        validator:retTrue,
                        name : "email",
                        label : "E-mail",
                        placeholder: userData.email,
                        id : "e-mail",
                        type: "email"
                    },
                    {
                        type:"text",
                        validator:retTrue,
                        name : "approach",
                        label : "Title",
                        placeholder: userData.approach,
                        id : "honorific"
                    },
                    {
                        name : "Submit",
                        placeholder: "Submit",
                        id : "submit",
                        type : "button"
                    }
                ]
                const onSubmitChangeDetails =(data :FormData<RegisterUser> )=>this.onSubmitChangeDetails(data)
            changeDetailsForm = <>
                {warnings}
                <Form<RegisterUser> onSubmit={onSubmitChangeDetails} inputs={changeDetailsFields}/>
            </>
        }else {
            changeDetailsForm = warnings
        }
            

            return(
                
                <div>
                    
                    <h5>Change Details</h5>
                    <Button className = {changeDetailsButtonShow} onClick = {this.setEditOnClick("changeDetails")}>Edit</Button>
                    <div className = {this.editClasses.changeDetails}>
                        {changeDetailsForm}
                    </div>

                    {/* <br/>
                    <h5>Add Address</h5>
                    <Button className = {addAddressButtonShow} onClick = {this.setEditOnClick("addAddress")}>Edit</Button>
                    <Form>
                        <FormGroup className = {this.editClasses.addAddress}>
                            <Label for="street">Street</Label>
                            <Input name="street" id="street" placeholder = "e.g. Lelielaan" />
                        </FormGroup>
                        <FormGroup className = {this.editClasses.addAddress}>
                            <Label for="number">Number</Label>
                            <Input name="number" id="number" placeholder = "e.g. 135" />
                        </FormGroup>
                        <FormGroup className = {this.editClasses.addAddress}>
                            <Label for="zipCode">Zip Code</Label>
                            <Input name="zipCode" id="zipCode" placeholder = "e.g. 9753AB" />
                        </FormGroup>
                        <FormGroup className = {this.editClasses.addAddress}>
                            <Label for="city">City</Label>
                            <Input name="city" id="city" placeholder = "e.g. Zwammerdam" />
                        </FormGroup>

                        <Button className = {this.editClasses.addAddress}>Add</Button>
                    </Form>
                    <br/>
                    <h5>Change Password</h5>
                    <Button className = {changePasswordButtonShow} onClick = {this.setEditOnClick("changePassword")}>Edit</Button>
                    <Form>
                        <FormGroup className = {this.editClasses.changePassword}>
                            <Label for="password">Password</Label>
                            <Input type="password" name="newPassword" id="newPassword" placeholder = "Please input a strong password" />
                        </FormGroup>

                        <FormGroup className = {this.editClasses.changePassword}>
                            <Label for="password">Password</Label>
                            <Input type="password" name="repeatPassword" id="repeatPassword" placeholder = "Please repeat your password" />
                        </FormGroup>

                        <FormGroup className = {this.editClasses.changePassword}>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder = "Please input your current password" />
                        </FormGroup>

                        <Button className = {this.editClasses.changePassword}>Submit</Button>
                    </Form>
                    <br/> */}

                    <h5>Remove All Addresses</h5>
                    <Button>Remove</Button>
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