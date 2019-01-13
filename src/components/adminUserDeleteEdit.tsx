import BasicComponent from "src/types/smallComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import { UserData } from "src/services/users";
import LoadSymbol from "./loadSymbol";
import { APIReturn } from "src/services/basics";
// import Button from "reactstrap/lib/Button";
import { EditScreen } from "./EditScreen";
import UserRow from "./UserRow";

type state = {
    success?: boolean | {
        success: boolean,
        message: string
    }, users: UserData[] | undefined,
    open: boolean,
    editUser?: UserData,
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

    update = async (user: UserData, update: (params: {}) => Promise<void>) => {
        await (
            this.props.APIS.req.buildRequest("path", `api/admin/users/${user.id}`)
                .buildRequest("method", "PUT")
                .buildRequest("body", user)
                .buildRequest("converter", (t: APIReturn<string>) => (t.data)
                ).run<UserData[]>())
        this.userEditModel(undefined, update)
    }



    renderDelete(users: UserData[], update: (params: {}) => Promise<void>) {
        return (
            <>
                <h2 className="titlePage">Edit and Delete Users</h2>

                <UserRow APIS={this.props.APIS} users={users} update={update} userDelete={this.usersDelete} userEditModel={this.userEditModel} />


                {this.state.editUser ? <EditScreen APIS={this.props.APIS} user={this.state.editUser} close={this.userEditModel} update={this.update} isAdmin={true} updateScreen={update} open={this.state.open} /> : null}

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