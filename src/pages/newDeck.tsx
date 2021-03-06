import * as React from "react";
import BasicPage from "src/types/basicComponent";
import FormGroup from "reactstrap/lib/FormGroup";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import { Button } from "reactstrap";
import { searchResult, searchCommander } from "src/services/search";
import { props } from "src/types/BasicProps";
import { createDeck, addCardToDeck } from "src/services/Decks";
import { Redirect, match } from "react-router";

type NewDeckProps = {match? : match<{cardId:string}>} & props
type NewDeckState = {
	autoCompleted : searchResult[][]
	redirectTo? : number

}

export default class NewDeck extends BasicPage<NewDeckProps,NewDeckState>{
	constructor(propsy : props){
		super(propsy)
		this.state = {autoCompleted:[[],[]]}
		this.onChange = this.onChange.bind(this)
		this.submit = this.submit.bind(this)
		this.getItemValue = this.getItemValue.bind(this)
		this.renderInput = this.renderInput.bind(this)
	}
	async onChange(version : number,e : React.ChangeEvent<HTMLInputElement>){
		const res = await searchCommander(e.target.value)
		let setState = res.length > this.state.autoCompleted[version].length
		setState = setState || res.some(v=> !this.state.autoCompleted[version].some(k=>v.id===k.id))
		if(setState){
			this.state.autoCompleted[version] = res;
			this.easySetState({autoCompleted : this.state.autoCompleted})
		}
	}
	async submit(e : any){
		e.preventDefault()
		const test = new FormData(e.target)
		const mainCommander = test.get("commander_name0")
		const deckName = test.get("deck_name")
		if(! (mainCommander && deckName) ){
			return
		}
		if(! (
			typeof mainCommander === "string" &&
			typeof deckName === "string"
		)){
			return
		}
		const res = await createDeck(this.props.APIS.req,{
			commander_name_1 : mainCommander,
			deck_name : deckName

		})
		if(res){
			if(this.props.match){
				await addCardToDeck(this.props.APIS.req,res,this.props.match.params.cardId)
			}
			this.easySetState({redirectTo:res})
		}

	}
	getItemValue(item : searchResult){
		return item.id
	}
	renderOptions(version:number){
		return (
			<datalist id={"commander_name"+version}>
				{this.state.autoCompleted[version].map(v=>
					<option key={v.id} value={v.name}/>
				)}
			</datalist>
		)
	}
	renderInput(num: number,name :string){
		const onChange = (e:React.ChangeEvent<HTMLInputElement> )=>this.onChange(num,e)
		return (
			<FormGroup>
				<Row className="justify-content-center">
					<Col xs={6}>
						<Label for={"deck_name"}>{name}</Label>
						<Input required={num === 0} list={"commander_name"+num} placeholder="Commander name" name={"commander_name"+num} id="commander_name" onChange={onChange}/>
					</Col>
				</Row>
				{this.renderOptions(num)}
			</FormGroup>

		)
	}
	render(){
		if(this.state.redirectTo){
			return <Redirect to={"/decks/"+this.state.redirectTo}/>
		}
		return (
			<form onSubmit={this.submit}>
				<FormGroup>
					<Row className="justify-content-center">
						<Col xs={6}>
							<Label for={"deck_name"}>Deck name</Label>
							<Input required={true} placeholder="Deck name" name="deck_name" id="deck_name"/>
						</Col>
					</Row>
				</FormGroup>
				{this.renderInput(0,"Main commander name")}
				{/* {this.renderInput(1,"Second commander name (partner)")} */}
				<FormGroup>
					<Row className="justify-content-center">
						<Col xs={6}>
							<Button color="success">Create</Button>
						</Col>
					</Row>
				</FormGroup>
			</form>
		)
	}
}