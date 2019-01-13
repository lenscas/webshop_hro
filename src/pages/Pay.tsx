import BasicPage from "src/types/basicComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import SuperDropDown, { dropDownItems } from "src/components/SuperDropDown";
import { Address } from "src/services/users";
import Button from "reactstrap/lib/Button";
import { APIReturn } from "src/services/basics";
import { readLocal } from "src/services/localStorage";
import { Redirect } from "react-router";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import "../style/pay.css";
import AddAddress from "src/components/AddAddress";
import Input from "reactstrap/lib/Input";

type PayState = {
    payMethods: string[],
    method: string,
    addresses: Address[] | undefined
    addres?: Address,
    addresIndex?: number
    orderd: boolean,
    open: boolean,
    update: boolean
}

export default class Pay extends BasicPage<props, PayState> {
    constructor(propsy) {
        super(propsy)
        this.state = {
            payMethods: ["Ideal", "Mastercard", "Visa", "American Express", "PayPal", "Gift card"],
            method: "Choose a payment method",
            addresses: [],
            orderd: false,
            open: false,
            update: false
        }
    }

    getAddresses = async () => {
        const addresses: Address[] | undefined = await this.props.APIS.req.doRequest<Address[]>("api/address/", (t: any) => t.data)
        return addresses
    }

    componentDidMount = async () => {
        this.setState({
            ...this.state,
            addresses: await this.getAddresses()
        })
        if (this.state.addresses && this.state.addresses.length > 0 && typeof this.state.addresses !== 'string') {
            this.state.addresses.map((v, y) => {
                if (v.main) {
                    this.setState({
                        ...this.state,
                        addres: v,
                        addresIndex: y
                    })
                }
            })
            if (!this.state.addres) {
                this.setState({
                    ...this.state,
                    addres: this.state.addresses ? this.state.addresses[0] : undefined,
                    addresIndex: this.state.addresses ? 0 : undefined
                })
            }
        }

    }


    toggle = () => {
        this.setState({
            ...this.state,
            open: !this.state.open
        })
    }

    order = async () => {

        const shoppingCardId = readLocal<number>("shoppingCartId")
        if (shoppingCardId) {
            const res = await (
                this.props.APIS.req.buildRequest("path", "api/order")
                    .buildRequest("method", "POST")
                    .buildRequest("body", { shoppingCardId, PayMethod: this.state.method, Address: this.state.addres })
                    .buildRequest("converter", (t: APIReturn<boolean>) => ({ success: t.success }))
            ).run<{ success: boolean }>()
            if (res && res.success) {
                this.setState({
                    ...this.state,
                    orderd: true
                })

            }
        }

    }
    close = () => {
        if(this.state.method!=="Choose a payment method"){
        this.order();
        this.toggle();
        }
    }

    update = async() => {
        this.setState({
            ...this.state,
            update: !this.state.update,
            addresses: await this.getAddresses()
        })
    }

    render = () => {

        const setAddress = (e) => {
            const index = e.target.options!.selectedIndex
            this.setState({
                ...this.state,
                addres: this.state.addresses![index],
                addresIndex: index
            })
        } 

        if (!this.state.addresses) {
            return <div>loading...</div>
        }
        if (this.state.orderd) {
            return <Redirect to="/" />
        }
        return (
            <table className="paymentTable">
                <tbody>
                    <tr>
                        <td>
                            <div className="adres">
                            <h2>Please select an address : </h2>
                                {this.state.addresses && this.state.addresses.length > 0 && typeof this.state.addresses !== 'string' ?
                                    <Input type="select" name="select" id="exampleSelect" onInput={setAddress} value={this.state.addres ? this.state.addres.street + " " +this.state.addres.number : ""}>
                                        {
                                            this.state.addresses.map((v, y) => {
                                                return <option key={v.id}>{ v.street + " " + v.number }</option>
                                            })
                                        }
                                    </Input>
                                    : <AddAddress APIS={this.props.APIS} succes={this.update} />
                                }
                                <div className="adresText">
                                    {
                                        this.state.addres ?
                                            <>
                                                <span>{this.state.addres.street} {this.state.addres.number}</span><br />
                                                <span>{this.state.addres.zipCode} {this.state.addres.city}</span>
                                            </>
                                            : null
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="pay">
                            <h2>Payment Method : </h2>
                                <SuperDropDown
                                    caret={true}
                                    items={this.state.payMethods.map<dropDownItems>(
                                        v => ({
                                            text: v,
                                            onClick: async () => {
                                                this.setState({ ...this.state, method: v })
                                            }
                                        })
                                    )
                                    }
                                    text={this.state.method}
                                />
                                
                            </div>
                            <img className="logoPay" src="http://www.stopmsnow.nl/wp-content/uploads/2016/11/Mollie-betalingen-1.jpg" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="buttonPay">
                                <Button color="primary" onClick={this.toggle}>Order</Button>
                                <Modal isOpen={this.state.open} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle} />
                                    <ModalBody>
                                        Are you sure you want to order?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.close}>Order</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}