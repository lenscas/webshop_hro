import BasicPage from "src/types/basicComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import ModalHeader from "reactstrap/lib/ModalHeader";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import AddAddress from "./AddAddress";

type AddressModalProps = {
    modal: boolean,
    toggle: () => void,
}

export default class AddressModal extends BasicPage<props & AddressModalProps, {}> {
    constructor(propsy) {
        super(propsy)
    }

    render = () => {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Product added to cart</ModalHeader>
                <ModalBody>
                    <AddAddress APIS={this.props.APIS} succes={this.props.toggle} />
                </ModalBody>
            </Modal>
        )
    }
}