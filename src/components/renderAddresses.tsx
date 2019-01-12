import BasicPage from "src/types/basicComponent";
import * as React from "react";
import Button from "reactstrap/lib/Button";
import { props } from "src/types/BasicProps";
import { Address } from "src/services/users";
import { readLocalRaw } from "src/services/localStorage";
import AddressModal from "./AddressModal";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

type UserDetailState = { less: boolean, buttenlessmore: string, perRow: number, model: boolean, open: boolean, editAddres: boolean, addressItem?: Address }

type RenderAddressesProps = {
    addresses: Address[],
    width: string,
    removingDefaultAddress: boolean,
    selectingDefaultAddress: boolean,
    setDefaultOnClick: (address: Address, toggle?: () => void) => () => void,
    setDefault: (addres: Address, toggle?: () => void) => void
}

export default class RenderAddresses extends BasicPage<props & RenderAddressesProps, UserDetailState> {

    constructor(propsy) {
        super(propsy)
        this.state = { less: true, buttenlessmore: "View more", perRow: 3, model: false, open: false, editAddres: false }
    }

    toggleOnclick = (address) => {
        return () => this.toggle(address)
    }

    toggle = (address? : Address) => {
        this.setState({
            ...this.state,
            open: !this.state.open,
            addressItem: address ? address : undefined,
            editAddres: false
        })
    }

    editAddres = () => {
        this.setState({
            ...this.state,
            editAddres: true
        })
    }


    showAddresses = () => {
        this.setState({
            ...this.state,
            less: !this.state.less,
            buttenlessmore: !this.state.less ? "View more address" : "View less address"
        })
    }

    addAddress = () => {
        this.setState({
            ...this.state,
            model: !this.state.model
        })
    }

    render = () => {

        const rows: JSX.Element[] = []
        const row: Address[] = []

        if (typeof this.props.addresses !== 'string') {
            this.props.addresses.map((address, i) => {
                if (address.main && !readLocalRaw("defaultAddress") && !this.props.removingDefaultAddress) {
                    this.props.setDefault(address, undefined)
                }

                const max = 3
                if (this.state.less) {
                    if (i < max) {
                        row.push(address)
                    }
                } else {
                    row.push(address)
                }
                if (row.length === this.state.perRow) {
                    rows.push(
                        <tr key={"a" + i}>
                            {row.map((addressItem, j) =>
                                <td key={addressItem.id}>
                                    <div className="card handOnHover" style={{ "width": this.props.width, "height": "12rem" }} onClick={this.toggleOnclick(addressItem)}>
                                        <div className="card-body">
                                            <div className="card-text float-left">
                                                <p>{addressItem.street} {addressItem.number}</p>
                                                <p>{addressItem.zipCode}</p>
                                                <p>{addressItem.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>)}
                        </tr>
                    )
                    row.length = 0
                }

            })

        }
        rows.push(
            <tr key={"b" + this.props.addresses.length}>
                {row.map((addressItem, j) =>
                    <td key={addressItem.id}>
                        <div className="card handOnHover" style={{ "width": this.props.width, "height": "12rem" }} onClick={this.toggleOnclick(addressItem)}>
                            <div className="card-body">
                                <div className="card-text float-left">
                                    <p>{addressItem.street} {addressItem.number}</p>
                                    <p>{addressItem.zipCode}</p>
                                    <p>{addressItem.city}</p>
                                </div>
                            </div>
                        </div>
                    </td>)}
            </tr>
        )

        const addButton = <td className="vButton" key={"c"}><Button className="float-left" onClick={this.addAddress}>Add a address</Button></td>
        const viewMoreLessButton = <td className="vButton" key={"d"}><Button onClick={this.showAddresses}>{this.state.buttenlessmore}</Button></td>
        const middle: JSX.Element[] = []
        rows.push(
            <tr key={"f"}>
                {addButton}
                {middle}
                {viewMoreLessButton}
            </tr>
        )
        return (
            <>
                {rows}
                <AddressModal APIS={this.props.APIS} modal={this.state.model} toggle={this.addAddress} />

                <Modal isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Address</ModalHeader>
                    <ModalBody>
                        {
                            this.state.editAddres ?
                                !this.state.addressItem ? <div> no addres found</div> : <div>Edit: {this.state.addressItem.id}</div>
                                : <div>What do you want to do? Choose one of the three options below, or click on the cross or next to this popup to do nothing.</div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.addressItem ?
                                <Button color="primary" onClick={this.props.setDefaultOnClick(this.state.addressItem, this.toggle)}>Set as default</Button>
                                : null
                        }

                        <Button color="success" onClick={this.editAddres}>Edit address</Button>
                        <Button color="danger">Delete address</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}