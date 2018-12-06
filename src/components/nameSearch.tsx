import BasicComponent from "src/types/smallComponent";
import * as React from "react";
import { Redirect } from "react-router";
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
			return <Redirect to={"/search/"+this.state.name}/>
		}
		return (
			<form className="search" onSubmit={this.onSubmit}>
				<input name="search" type="text" placeholder="Search"/>
			</form>
		)
	}
}