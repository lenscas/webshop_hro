import BasicComponent from "src/types/smallComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import { UserData } from "src/services/users";
import Input from "reactstrap/lib/Input";
//import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";
// import { APIReturn } from "src/services/basics";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";

type EditProps = {
    user: UserData,
    isAdmin: boolean,
    close: (user: UserData | undefined, update?: (params: {}) => Promise<void>) => void,
    updateScreen: (params: {}) => Promise<void>,
    open: boolean
    update: (user: UserData, update: (params: {}) => Promise<void>) => void
} & props

export class EditScreen extends BasicComponent<EditProps, { user: UserData }>{
    constructor(propsy) {
        super(propsy)
        this.state = { user: this.props.user }
    }



    update = (e : any) => {
        e.preventDefault()
        console.log('test onsubmit')
        this.props.update(this.state.user, this.props.updateScreen)
    }

    toggle = () => {
        this.props.close(undefined, this.props.updateScreen)
    }

    render() {

        const updateName = (e) => {
            console.log("test onchange")
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    name: e.target.value
                }
            })
        }
        const updateEmail = (e) => {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    email: e.target.value
                }
            })
        }
        const updateApproach = (e) => {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    approach: e.target.value
                }
            })
        }
        const updateRole = (e) => {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    role: e.target.value
                }
            })
        }

        return (
            <Modal isOpen={this.props.open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.update}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Name" value={this.state.user.name} onChange={updateName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input type="email" className="form-control" id="email" aria-describedby="Email" placeholder="Email" value={this.state.user.email} onChange={updateEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="approach">Approach</label>
                            <Input type="select" className="form-control" id="approach" aria-describedby="approach" placeholder="Approach" value={this.state.user.approach} onChange={updateApproach} >
                                <option>Mr.</option>
                                <option>Mrs.</option>
                            </Input>
                        </div>
                        {
                            this.props.isAdmin ?
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <Input type="text" className="form-control" id="role" aria-describedby="role" placeholder="Role" value={this.state.user.role} onChange={updateRole} />
                                </div>
                                : null
                        }

                        <Button color="primary" onClick={this.update} type='submit'>Submit</Button>
                    </form>
                </ModalBody>
            </Modal>
        )
    }
}