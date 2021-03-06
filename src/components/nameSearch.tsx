import BasicComponent from "src/types/smallComponent";
import * as React from "react";
import { Redirect } from "react-router";
import Input from "reactstrap/lib/Input";
//import * as React from "react";
type NameSearchProps = {
	name? : string
}
export class NameSearch extends BasicComponent<{},NameSearchProps>{
	constructor(propsy){
		super(propsy)
		this.state = {}
		this.onSubmit = this.onSubmit.bind(this)
	}
	onSubmit(e : any){
		e.preventDefault()
		const data = new FormData(e.target).get("search")
		if(typeof data ==="string"){
			this.easySetState({name: data})
		}
		
	}
	render(){
		if(this.state && this.state.name){
			const name = this.state.name
			this.easySetState({name: undefined})
			return <Redirect to={"/search/"+name}/>
		}
		return (
			<form className="search" onSubmit={this.onSubmit}>
				<Input name="search" type="text" placeholder="Search"/>
			</form>
		)
	}
}