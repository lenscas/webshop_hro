import BasicPage from "src/types/basicComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import LoadSymbol from "./loadSymbol";
import { getHistory, getHistoryItems } from "src/services/users";
import Card from "reactstrap/lib/Card";
import CardTitle from "reactstrap/lib/CardTitle";
import CardText from "reactstrap/lib/CardText";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
// import { Link } from "react-router-dom";

export type OrderItem = { name: string, quantity: number, price: number, id: number }

export default class HistoryPage extends BasicPage<props, { open: boolean, id?: number, items?: OrderItem[] | undefined }> {

    constructor(propsy) {
        super(propsy)
        this.state = { open: false }
    }

    testOnClick = (id: number) => {
        return () => this.test(id)
    }

    test = async (id: number) => {
        this.setState({
            ...this.state,
            id,
            open: !this.state.open,
            items: await getHistoryItems(this.props.APIS.req, id)
        })
    }

    toggle = () => {
        this.setState({
            ...this.state,
            open: !this.state.open,
            id: undefined,
            items: undefined
        })
    }

    renderHistory = (order: Array<{ statusString: string, payMethod: string, address: string, date: string, id: number }>) => {
        return <div>
            {
                order.map(v =>

                    <Card body={true} onClick={this.testOnClick(v.id)} key={v.id} className="handOnHover history">
                        <CardTitle>{new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(v.date))} - paid with: {v.payMethod}</CardTitle>
                        <CardText>Delivery Address: {v.address}</CardText>
                        <CardText>{v.statusString}</CardText>
                    </Card>
                )
            }
            <Modal isOpen={this.state.open} toggle={this.toggle} className="historyModel">
                <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                <ModalBody className="historyModelBody">
                    {
                        this.state.id && this.state.items ?
                            <table className="centerItems">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.items.map(v => {
                                            return v.name !== "Total" ? <tr key={v.id}>
                                                <td>{v.name}</td>
                                                <td>{v.quantity}</td>
                                                <td>{v.price / 100}</td>
                                            </tr> :
                                                <tr className="historyTotal">
                                                    <td>{v.name}</td>
                                                    <td>{v.quantity}</td>
                                                    <td>{v.price / 100}</td>
                                                </tr>
                                        })
                                    }
                                    {}
                                </tbody>
                            </table>
                            : null
                    }
                </ModalBody>
            </Modal>
        </div>
    }

    render = () => {
        const fetch = async () => await getHistory(this.props.APIS.req)

        return <LoadSymbol<{}, Array<{ statusString: string, payMethod: string, address: string, date: string, id: number }> | undefined>
            toRender={this.renderHistory}
            params={{}}
            getData={fetch}
        />
    }
}