import BasicPage from "src/types/basicComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import { Address, UserData, setDefaultAddress } from "src/services/users";
import { readLocal, removeLocal, storeLocal } from "src/services/localStorage";
import RenderAddresses from "./renderAddresses";
import { EditScreen } from "./EditScreen";
import { APIReturn } from "src/services/basics";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Button from "reactstrap/lib/Button";

type UserDetailState = { selectingDefaultAddress: boolean, removingDefaultAddress: boolean, open: boolean, modelUnset: boolean }

export default class UserDetail extends BasicPage<props & { userdata: UserData, update: (params: {}) => Promise<void>, less: boolean, showAddresses: () => void }, UserDetailState> {
    constructor(propsy) {
        super(propsy)
        this.state = { selectingDefaultAddress: false, removingDefaultAddress: false, open: false, modelUnset: false }
    }

    setSelectOnClick(selectingDefAddress: boolean) {
        return () => this.setSelect(selectingDefAddress)
    }

    setSelect(selectingDefAddress: boolean) {
        this.easySetState({ selectingDefaultAddress: selectingDefAddress })
    }

    setDefault = (address: Address, toggle?: () => void) => {

        this.setSelect(false)
        address.main = true

        setDefaultAddress(this.props.APIS.req, address)

        storeLocal("defaultAddress", address)
        if (toggle) {
            toggle()
        }


    }

    setDefaultOnClick = (address: Address, toggle: () => void) => {

        return () => this.setDefault(address, toggle)
    }

    unsetDefault = async () => {

        const add = readLocal<Address>("defaultAddress")
        if (add) {
            add.main = false
            await setDefaultAddress(this.props.APIS.req, add)
        }
        removeLocal("defaultAddress")


        this.easySetState({ removingDefaultAddress: true, modelUnset: false })
    }
    toggle = () => {
        this.setState({
            ...history.state,
            modelUnset: !this.state.modelUnset
        })
    }

    userEditModelOnClick = (v, update?: (params: {}) => Promise<void>) => {
        return () => this.userEditModel(v, update)
    }

    userEditModel = (v, update?: (params: {}) => Promise<void>) => {
        this.easySetState({
            open: !this.state.open
        })
        if (update) {
            update({})
        }
    }

    update = async (user: UserData, update: (params: {}) => Promise<void>) => {
        await (
            this.props.APIS.req.buildRequest("path", `api/user`)
                .buildRequest("method", "PUT")
                .buildRequest("body", user)
                .buildRequest("converter", (t: APIReturn<string>) => (t.data)
                ).run<UserData[]>())
        this.userEditModel(undefined, update)
    }

    render() {
        const defaultAddress: Address | undefined = readLocal("defaultAddress")
        let defaultAddressView = (
            <div>
                <div className="card" >
                    <div className="card-body">
                        <div className="card-text float-left">
                            <b>You don't have a default address set!</b>
                            <p>choice a address below click on it and the choice set as default.</p>
                            {/* {
                                this.state.selectingDefaultAddress ?
                                    <Button onClick={this.setSelectOnClick(false)}>Cancel</Button>
                                    : <Button onClick={this.setSelectOnClick(true)}>Select</Button>
                            } */}
                        </div>
                    </div>
                </div>
            </div>)

        if (defaultAddress !== undefined) {
            defaultAddressView = (
                <div>
                    <div className="card handOnHover" onClick={this.toggle}>
                        <div className="card-body">
                            <div className="card-text float-left">
                                <b>Your Default Address:</b>
                                <p>{defaultAddress.street} {defaultAddress.number}</p>
                                <p>{defaultAddress.zipCode}</p>
                                <p>{defaultAddress.city}</p>
                            </div>
                            {/* <div className="d-flex flex-column float-right" style={{ "width": "4rem" }}>
                                <Button id="unsetKnop" className="justify-content-end" onClick={this.unsetDefault}>Unset</Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h4 className="userWelcome"><b>Welcome, {this.props.userdata.approach} {this.props.userdata.name}!</b></h4>
                <div className="CardBody">
                    <div className="d-flex flex-row">
                        {defaultAddressView}
                        <div className="userDetail">
                            <div className="card handOnHover" onClick={this.userEditModelOnClick(this.props.userdata)}>
                                <div className="card-body">
                                    <div className="card-text float-left">
                                        <b>Your Details:</b>
                                        <p>Title: {this.props.userdata.approach}</p>
                                        <p>Name: {this.props.userdata.name}</p>
                                        <p>E-Mail: {this.props.userdata.email}</p>
                                    </div>
                                    {/* <div className="d-flex flex-column float-right" style={{ "width": "4rem" }}>
                                        { <Button id="editKnop" className="justify-content-start" style={{ "marginBottom": "2rem", "marginTop": "2rem" }} >Edit</Button> }

                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditScreen APIS={this.props.APIS} user={this.props.userdata} close={this.userEditModel} update={this.update} isAdmin={false} updateScreen={this.props.update} open={this.state.open} />

                    <table>
                        <tbody className="float-left">
                            <tr><th>All Addresses:</th></tr>
                            <RenderAddresses APIS={this.props.APIS}
                                addresses={this.props.userdata.addresses}
                                width="12rem"
                                removingDefaultAddress={this.state.removingDefaultAddress}
                                selectingDefaultAddress={this.state.selectingDefaultAddress}
                                setDefaultOnClick={this.setDefaultOnClick}
                                setDefault={this.setDefault} 
                                update={this.props.update}
                                less={this.props.less}
                                showAddresses={this.props.showAddresses}/>
                        </tbody>
                        <Modal isOpen={this.state.modelUnset} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Address</ModalHeader>
                            <ModalBody>
                                Click on Unset to delete your default address or on the cross or next to this popup to go back.
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.unsetDefault} color="danger">Unset</Button>
                            </ModalFooter>
                        </Modal>
                    </table>
                </div>
            </div>
        )
    }
}