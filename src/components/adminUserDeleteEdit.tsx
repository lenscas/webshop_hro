import BasicComponent from "src/types/smallComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import { UserData } from "src/services/users";
import LoadSymbol from "./loadSymbol";
import { APIReturn } from "src/services/basics";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
// import Button from "reactstrap/lib/Button";
import { EditScreen } from "./EditScreen";

type state = {
    success?: boolean | {
        success: boolean,
        message: string
    }, users: UserData[] | undefined,
    open: boolean,
    editUser?: UserData
}

export class AdminUserDeleteEdit extends BasicComponent<props, state>{
    constructor(propsy) {
        super(propsy)

        this.state = { users: undefined, open: false }

        this.renderDelete = this.renderDelete.bind(this)
    }

    async getUsers() {
        return await (
            this.props.APIS.req.buildRequest("path", `api/admin/users`)
                .buildRequest("method", "GET")
                .buildRequest("converter", (t: APIReturn<UserData[]>) => (t.data)
                ).run<UserData[]>())
    }

    userDeleteOnClick(userId: number, update?: (params: {}) => Promise<void>) {
        return () => this.usersDelete(userId, update)
    }

    usersDelete = async (userId: number, update?: (params: {}) => Promise<void>) => {
        await (
            this.props.APIS.req.buildRequest("path", `api/admin/users/${userId}`)
                .buildRequest("method", "DELETE")
                .buildRequest("converter", (t: APIReturn<UserData[]>) => (t.data)
                ).run<UserData[]>())
        if (update) {
            update({})
        }
    }

    userEditModelOnClick = (v, update?: (params: {}) => Promise<void>) => {
        return () => this.userEditModel(v, update)
    }

    userEditModel = (v, update?: (params: {}) => Promise<void>) => {
        this.easySetState({
            open: !this.state.open,
            editUser: v
        })
        if (update) {
            update({})
        }
    }

    renderDelete(users: UserData[], update: (params: {}) => Promise<void>) {
        return (
            <>
                <table >
                    <thead>
                        <tr className="align" >
                            <th>UserName</th>

                            <th>Email</th>

                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((v) => {
                                return (
                                    <tr className="align" key={v.id}>
                                        <td>{v.name}</td>

                                        <td>{v.email}</td>

                                        {/* <td><Button onClick={this.userDeleteOnClick(v.id)} >Delete</Button></td> */}
                                        <td><i className="far fa-trash-alt mouse" onClick={this.userDeleteOnClick(v.id, update)} /></td>
                                        <td><i className="fas fa-wrench  mouse" onClick={this.userEditModelOnClick(v)} /></td>
                                        {/* <i class="fas fa-wrench"></i> */}
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
                <Modal isOpen={this.state.open} toggle={this.userEditModelOnClick(undefined, update)}>
                    <ModalHeader toggle={this.userEditModelOnClick(undefined, update)}>Edit User</ModalHeader>
                    <ModalBody>
                        {this.state.editUser ? <EditScreen APIS={this.props.APIS} user={this.state.editUser} close={this.userEditModel} update={update}/> : "no user found"}

                    </ModalBody>
                </Modal>
            </>
        )
    }
    render() {
        const fetch = async () => await this.getUsers()

        return (
            <>

                <LoadSymbol<{}, UserData[] | undefined>
                    toRender={this.renderDelete}
                    params={{}}
                    getData={fetch} />
            </>
        )

    }
}