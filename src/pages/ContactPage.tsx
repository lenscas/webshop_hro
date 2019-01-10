import * as React from "react";
import Form, {InputField, FormData} from "../components/form";
import { retTrue } from "src/funcs/lambdas";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Button from "reactstrap/lib/Button";
import BasicPage from "src/types/basicComponent";
import { props } from "src/types/BasicProps";


type feedbackState = {modal: boolean}
type testSubmit = {
	test : string
}

export default class ContactPage extends BasicPage<props,feedbackState> {
    constructor(propsi){
        super(propsi)
        this.feedbackReceived = this.feedbackReceived.bind(this);
        this.state            = {modal:false}
        this.onSubmit = this.onSubmit.bind(this)
    }
    modOnClick(feedbackReceived){
        return ()=>feedbackReceived(this.feedbackReceived)
    }
    onSubmit(data : FormData<testSubmit>){ 
        this.feedbackReceived() 
    }
    async feedbackReceived() {
        this.setState({
          modal: !this.state.modal
        });
    }
    render() {
        const fields : InputField[] = [
            {
                type:"text",
                name : "firstName",
                label : "First name",
                id : "firstName",
                validator: retTrue
            },
            {
                type:"text",
                name : "lastName",
                label : "Last name",
                id : "lastName",
                validator:retTrue

            },
            {
                name: "subject",
                label: "Subject",
                id : "subject",
                type: "select",
                options: ["Question","Suggestion","Complaint","Bug report","Other"]
            },
            {
                name: "message",
                label: "Message",
                id : "message",
                type: "textarea",
                validator:retTrue
            },
            {
                type:"button",
                name : "submit",
                placeholder: "Submit",
                id : "submit",
            }
        ]

        return (       
            <div>
                <Form<testSubmit> onSubmit={this.onSubmit} inputs={fields}/>
                    <Modal isOpen={this.state.modal} toggle={this.feedbackReceived}>
                    <ModalHeader toggle={this.feedbackReceived}>Thanks for your feedback!</ModalHeader>
                    <ModalBody>
                        {"We will answer your question as soon as possible"}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.feedbackReceived}>Go back</Button>{' '}
                    </ModalFooter>
                    </Modal>
                </div>
        )     
        }
}