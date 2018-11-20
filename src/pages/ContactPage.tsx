import * as React from "react";
import BasicPage from "src/types/basicComponent";
import Form, {InputField, FormData} from "../components/form";
import { retTrue } from "src/funcs/lambdas";

type testSubmit = {
	test : string
}

export default class ContactPage extends BasicPage {
    onSubmit(data : FormData<testSubmit>){
        // tslint:disable-next-line:no-console
		console.log(data.values)
		// tslint:disable-next-line:no-console
		console.log(data.event)
		// tslint:disable-next-line:no-console
		console.log("Did submit")
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
                type: "textarea",
                validator:retTrue
            },
            {
                type:"button",
                name : "submit",
                label: "Submit",
                placeholder: "Submit",
                id : "submit",
            }
        ]

        return <Form<testSubmit> onSubmit={this.onSubmit} inputs={fields}/>
        }
            /*<div className="container">
                <form action="action_page.php">
                    <label>First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="First name"/>
                    <label>Last Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Last name"/>

                    <label>Subject</label>
                    <textarea id="subject" name="subject" placeholder="What is the problem?"/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>*/
        //)
   // }
}