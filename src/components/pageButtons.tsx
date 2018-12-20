import * as React from "react";
import BasicComponent from "src/types/smallComponent";
import Button from "reactstrap/lib/Button";

type PageButtonProps = {
	page : number,
	setNewNumber:(newPage : number)=>void
}

export default class PageButtons extends BasicComponent<PageButtonProps> {
	constructor(props){
		super(props)
		this.goTo = this.goTo.bind(this)
		this.goBack = this.goBack.bind(this)
		this.goForward = this.goForward.bind(this)
	}
	goTo(newPage: number){
		this.props.setNewNumber(newPage)
	}
	goBack(){
		const newNumber = this.props.page - 1
		if(newNumber > 0){
			this.goTo(newNumber)
		}
	}
	goForward(){
		this.goTo(this.props.page + 1)
	}
	render(){
		return (
			<div className="row">
				<div className="col-6 mt-2 mb-2">
					<Button onClick={this.goBack} color="dark">{"<"}</Button>
				</div>
				<div className="col-6 col-6 mt-2 mb-2">
					<Button onClick={this.goForward} className="float-right" color="dark">></Button>
				</div>
			</div>
		)
	}
}