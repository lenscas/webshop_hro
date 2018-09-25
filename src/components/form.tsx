import * as React from "react";
import {Col, FormGroup,Label,Input, Button } from 'reactstrap';
export type InputField = {
	name : string,
	label : string,
	id : string,
	defaultValue? : any,
	type? : "number" | "text" | "hidden" | "email" | "password" | "button" | "textarea"
	isTextArea? : boolean,
	isRequered? : boolean,
}
export type FormData<T> = {
	values : T
	event : React.FormEvent<HTMLFormElement>
}
export type FormProps<T> = {
	onSubmit : (e:FormData<T>)=>void
	inputs : InputField[]
}
type FormState<T extends {}> = {
	values : Partial<T>
}
export default class Form<T extends {}> extends React.Component<FormProps<T>,FormState<T>> {
	constructor(propsy : FormProps<T>){
		super(propsy)
		this.state = {values:{}}
	}

	renderInputGroup(input : InputField){
		

		return(
			<FormGroup row={true} key={input.id}>
				<Label for={input.id} sm={2}>{input.label}</Label>
				<Col sm={10}>
					{this.renderInput(input)}
				</Col>
			</FormGroup>
		)
	}
	renderInput(input : InputField): JSX.Element{
		let inputElement : JSX.Element;
		input.type = input.type ? input.type : "text";
		const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
			const newValues = {...this.state.values as object};
			newValues[input.name] = e.target.value;
			this.setState({values : newValues})
		}
		let extraProps :any = {required: true}
		if( (!input.isRequered) && (input.isRequered !== undefined)){
			extraProps = {}
		}
		switch(input.type){
			case "button":
				inputElement = <Button id={input.id} type="submit" name={input.name} color="success" >{input.label}</Button>
			break;
			default:
				inputElement = <Input type={input.type}  onChange={onChange} placeholder={input.label} id={input.id } {...extraProps} />
			break;
		}
		return inputElement

	}

	render(){
		const onSubmit = (e : React.FormEvent<HTMLFormElement> )=>{
			e.preventDefault();
			const formData : FormData<T> = {
				values : this.state.values as T,
				event : e
			}
			this.props.onSubmit(formData)
		}
		return (<form onSubmit={onSubmit}>
			{this.props.inputs.map(input=>this.renderInputGroup(input))}
		</form>)
	}
}