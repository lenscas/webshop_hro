import BasicPage from "../types/basicComponent";
import { props } from "../types/BasicProps";
import * as React from "react";
import { UserData } from "src/services/users";
import Input from "reactstrap/lib/Input";

type userRowProps = {
    users: UserData[]
    userDelete: (userId: number, update?: (params: {}) => Promise<void>) => void,
    update: (params: {}) => Promise<void>,
    userEditModel: (v, update?: (params: {}) => Promise<void>) => void
} & props

export default class UserRow extends BasicPage<userRowProps, { filtered: UserData[] }>{

    constructor(propsy) {
        super(propsy)
        this.state = {
            filtered: []
        }
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.users
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleChange = (e) => {
        // Variable to hold the original version of the list
    let currentList: UserData[] = [];
        // Variable to hold the filtered list before putting into state
    let newList: UserData[] = [];

        // If the search bar isn't empty
    if (e.target.value !== "") {
            // Assign the original list to currentList
      currentList = this.props.users;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
      newList = currentList.filter((item: UserData) => {
                // change current item to lowercase
        const lc = item.name.toLowerCase();
                // change search term to lowercase
        const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.props.users;
    }
        // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }

    render = () => {
        const userDeleteOnClick = (userId: number, update?: (params: {}) => Promise<void>) => () => this.props.userDelete(userId, update)
        const userEditModelOnClick = (v, update?: (params: {}) => Promise<void>) => () => this.props.userEditModel(v)

        return (
            <>
                <div className="container">
                    <Input type="text" placeholder="Serach user" onChange={this.handleChange}/>
                </div>
                <table className="tableDelete">
                    <thead>
                        <tr id="Delete" className="align" >
                            <th className="thDelete">UserName</th>

                            <th className="thDelete">Email</th>

                            <th className="thDelete">Delete</th>
                            <th className="thDelete">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered.map((v) => {
                            return (
                                <tr id="Delete" className="align" key={v.id}>
                                    <td className="thDelete">{v.name}</td>

                                    <td className="thDelete">{v.email}</td>

                                    {/* <td><Button onClick={this.userDeleteOnClick(v.id)} >Delete</Button></td> */}
                                    <td className="thDelete"><i className="far fa-trash-alt mouse" onClick={userDeleteOnClick(v.id, this.props.update)} /></td>
                                    <td className="thDelete"><i className="fas fa-wrench  mouse" onClick={userEditModelOnClick(v)} /></td>
                                    {/* <i class="fas fa-wrench"></i> */}
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </>
        )

    }
}