import BasicComponent from "src/types/smallComponent";
import { props } from "src/types/BasicProps";
import * as React from "react";
import { UserData } from "src/services/users";
import Input from "reactstrap/lib/Input";
import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";
import { APIReturn } from "src/services/basics";

type EditProps = {
    user: UserData,
    close: (user: UserData | undefined, update?: (params: {}) => Promise<void>) => void,
    update: (params: {}) => Promise<void>
} & props

export class EditScreen extends BasicComponent<EditProps, {user: UserData}>{
    constructor(propsy) {
        super(propsy)
        this.state = {user: this.props.user}
    }

    update = async () => {
        await (
            this.props.APIS.req.buildRequest("path", `api/admin/users/${this.state.user.id}`)
                .buildRequest("method", "PUT")
                .buildRequest("body", this.state.user)
                .buildRequest("converter", (t: APIReturn<string>) => (t.data)
                ).run<UserData[]>())
        this.props.close(undefined, this.props.update)
    }

    render() {

        const updateName = (e) => {
            this.setState({
                ...this.state,
                user : {
                    ...this.state.user,
                    name: e.target.value
                }
            })
        }
        const updateEmail = (e) => {
            this.setState({
                ...this.state,
                user : {
                    ...this.state.user,
                    email: e.target.value
                }
            })
        }
        const updateApproach = (e) => {
            this.setState({
                ...this.state,
                user : {
                    ...this.state.user,
                    approach: e.target.value
                }
            })
        }
        const updateRole = (e) => {
            this.setState({
                ...this.state,
                user : {
                    ...this.state.user,
                    role: e.target.value
                }
            })
        }

        return (
            <Form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Name" value={this.state.user.name} onChange={updateName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input type="email" className="form-control" id="email" aria-describedby="Email" placeholder="Email" value={this.state.user.email} onChange={updateEmail}/>
                </div>
                <div className="form-group">
                    <label htmlFor="approach">Approach</label>
                    <Input type="text" className="form-control" id="approach" aria-describedby="approach" placeholder="Approach" value={this.state.user.approach} onChange={updateApproach}/>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <Input type="text" className="form-control" id="role" aria-describedby="role" placeholder="Role" value={this.state.user.role} onChange={updateRole}/>
                </div>
                <Button color="primary" onClick={this.update}>Submit</Button>
            </Form>
        )
    }
}