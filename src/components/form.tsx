import * as React from "react";
import {Col, FormGroup,Label,Input, Button, FormFeedback, Form as BootForm } from 'reactstrap';

export type InputField<ValueType> = {
	name : string,
	label? : string,
	innerLabel? : string,
	id : string,
	defaultValue? : ValueType,
	type? : "number" | "text" | "hidden" | "email" | "password" | "button" | "textarea"
	isTextArea? : boolean,
	isOptional? : boolean,
	validator? : (value : ValueType)=>FormValidationToolTip | true
}
export type FormData<T> = {
	values : T
	event : React.FormEvent<HTMLFormElement>
}
export type FormProps<T> = {
	onSubmit : (e:FormData<T>)=>void
	inputs : Array<InputField<unknown>>
}
export type FormValidationToolTip = {
	isValid : boolean
	message : string
}
export type elementInState =  {
	isValid? : boolean
	message? : string
}

export type FormState<T extends elementInState> = {
	values : Partial<T>
}
export default class Form<FormType extends {}> extends React.Component<FormProps<FormType>,FormState<FormType>> {
	constructor(propsy : FormProps<FormType>){
		super(propsy)
		this.state = {values:{}}
	}


	basicValidator(value : unknown, input : InputField<unknown>) : boolean | FormValidationToolTip {
		if(!input.isOptional){
			if(value === undefined || value === null || value === "" || value ===0){
				return {message : "This field needs to be filled in", isValid : false}
			}
		}
		if(input.type === "number"){
			if(typeof value==="string" && isNaN(parseInt(value,10))){
				return {message : "This field needs to be a number", isValid : false}
			}
		}
		return true
	}
	createOnChange(input : InputField<unknown>){
		input.type = input.type ? input.type : "text";
		return (e : React.ChangeEvent<HTMLInputElement>) =>{
			const rawBasicValidator = this.basicValidator(e.target.value, input)
			let isValid = this.maybeToolTipToBoolean(rawBasicValidator)
			let message : string | undefined = this.getMessageFromMaybeToolTip(rawBasicValidator)

			if(input.validator){
				const rawValidator = input.validator(e.target.value)
				isValid = this.maybeToolTipToBoolean(rawValidator)
				message = this.getMessageFromMaybeToolTip(rawValidator)
			}

			const newValue = {
				isValid,
				message,
				value : e.target.value
			}
			const updateState = (st : FormState<FormType>) => {
				st.values[input.name] = newValue
				return st
			}
			this.setState(updateState)
		}
	}

	renderInputGroup(input : InputField<unknown>){
		const rawResult = this.checkInputValidity(input)
		const isValid = this.maybeToolTipToBoolean(rawResult)
		const message = this.getMessageFromMaybeToolTip(rawResult)
		return(
			<FormGroup row={true} key={input.id}>
				<Label for={input.id} sm={2}>{input.label||""}</Label>
				<FormFeedback tooltip={true} valid={isValid}><p>{message}</p></FormFeedback>
				<Col sm={10}>
					{this.renderInput(input, {message,isValid})}
				</Col>
			</FormGroup>
		)
	}
	renderInput(input : InputField<unknown>, tooltip : FormValidationToolTip): JSX.Element{
		let inputElement : JSX.Element;
		const onChange = this.createOnChange(input)
		switch(input.type){
			case "button":
				inputElement = <Button id={input.id} type="submit" name={input.name} color="success" >{input.innerLabel}</Button>
			break;
			default:
				inputElement = <Input
					key={input.name}
					valid={tooltip.isValid}
					invalid={!tooltip.isValid}
					aria-invalid={!tooltip.isValid}
					type={input.type}
					onChange={onChange}
					placeholder={input.innerLabel||input.label}
					id={input.id }
					required={!input.isOptional}
				/>
			break;
		}
		return inputElement

	}
	checkInputValidity(input : InputField<unknown>): boolean | FormValidationToolTip {
		const elInState : elementInState | undefined = this.state.values[input.name]
		let isValid : boolean | FormValidationToolTip = false
		if(elInState){
			if(elInState.message){
				isValid = {message : elInState.message, isValid : elInState.isValid || false}
				console.log("is message seems to be ",isValid)
			} else {
				isValid = elInState.isValid || false
			}
		} else {
			isValid = this.basicValidator(this.state.values[input.name], input)
			console.log("basicValidator",isValid)
		}
		return isValid
	}
	maybeToolTipToBoolean(tip : boolean | FormValidationToolTip){
		if(typeof tip === "boolean"){
			return tip
		} else {
			return tip.isValid
		}
	}
	getMessageFromMaybeToolTip(tip: boolean | FormValidationToolTip){
		if(typeof tip === "boolean"){
			return ""
		}
		return tip.message
	}
	render(){
		const onSubmit = (e : React.FormEvent<HTMLFormElement> )=>{
			e.preventDefault();
			const isValid = this.props.inputs.every(input=>input.type === "button"||this.maybeToolTipToBoolean(this.checkInputValidity(input)))
			console.log(isValid)
			console.log(Object.keys)
			if(!isValid){
				return;
			}
			const formData : FormData<FormType> = {
				values : this.state.values as FormType,
				event : e
			}
			this.props.onSubmit(formData)
		}
		return (<BootForm onSubmit={onSubmit}>
			{this.props.inputs.map(input=>this.renderInputGroup(input))}
		</BootForm>)
	}
}