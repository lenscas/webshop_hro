import BasicPage from "src/types/basicComponent";
import * as React from "react";
import Button from "reactstrap/lib/Button";
import { props } from "src/types/BasicProps";
import { Address } from "src/services/users";
import { readLocalRaw } from "src/services/localStorage";
import AddressModal from "./AddressModal";

type UserDetailState = { less: boolean, buttenlessmore: string, perRow: number,model: boolean }

type RenderAddressesProps = {
    addresses: Address[],
    width: string,
    removingDefaultAddress: boolean,
    selectingDefaultAddress: boolean,
    setDefaultOnClick: (address: Address) => () => void,
    setDefault: (addres: Address) => void
}

export default class RenderAddresses extends BasicPage<props & RenderAddressesProps, UserDetailState> {

    constructor(propsy) {
        super(propsy)
        this.state = { less: true, buttenlessmore: "View more", perRow: 3, model: false }
    }


    showAddresses = () => {
        this.setState({
            ...this.state,
            less: !this.state.less,
            buttenlessmore: !this.state.less ? "View more" : "View less"
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

        const addressButton = (addressItem) => {
            if (this.props.selectingDefaultAddress) {
                return (
                    <Button color="primary" onClick={this.props.setDefaultOnClick(addressItem)}>Select</Button>
                )
            }
            return <Button>Delete</Button>
        }

        if (typeof this.props.addresses !== 'string') {
            this.props.addresses.map((address, i) => {
                if (address.main && !readLocalRaw("defaultAddress") && !this.props.removingDefaultAddress) {
                    this.props.setDefault(address)
                }
                
                const max = 3
                if(this.state.less) {
                    if(i < max) {
                        row.push(address)
                    }
                } else {
                    row.push(address)
                }
                if(row.length === this.state.perRow) {
                    rows.push(
                        <tr key={"a" + i}>
                            {row.map((addressItem, j)  => 
                                <td key={addressItem.id}>
                                    <div className="card" style={{ "width": this.props.width, "height": "12rem" }}>
                                        <div className="card-body">
                                            <div className="card-text float-left">
                                                <p>{addressItem.street} {addressItem.number}</p>
                                                <p>{addressItem.zipCode}</p>
                                                <p>{addressItem.city}</p>
                                                {addressButton(addressItem)}
                                            </div>
                                        </div>
                                    </div>
                                </td> )}
                        </tr>
                    )
                    row.length = 0
                } 
                    
            })

        }
            rows.push(
                <tr key={"b" + this.props.addresses.length}>
                    {row.map((addressItem, j)  => 
                        <td key={addressItem.id}>
                            <div className="card" style={{ "width": this.props.width, "height": "12rem" }}>
                                <div className="card-body">
                                    <div className="card-text float-left">
                                        <p>{addressItem.street} {addressItem.number}</p>
                                        <p>{addressItem.zipCode}</p>
                                        <p>{addressItem.city}</p>
                                        {addressButton(addressItem)}
                                    </div>
                                </div>
                            </div>
                        </td> )}
                </tr>
            )

        const addButton = <td key={"c"}><Button className="float-left" onClick={this.addAddress}>Add</Button></td>
        const viewMoreLessButton = <td key={"d"}><Button onClick={this.showAddresses}>{this.state.buttenlessmore}</Button></td>
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
            </>
        )
    }
}