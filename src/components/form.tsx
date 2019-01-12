import * as React from "react";
import { Col, FormGroup, Label, Input, Button, FormFeedback, Form as BootForm, Row } from 'reactstrap';
import BasicComponent from "src/types/smallComponent";
import { InputType } from "reactstrap/lib/Input";

type formValidation<T> = (value: T) => FormValidationToolTip | true

type BasicInputField = {
	name: string
	id: string
	label?: string,
	placeholder?: string,
	isOptional?: boolean,
	value?: string
}

export type InputField = BasicInputField & (
	{
		type: "number"
		validator: formValidation<number>

	} | {
		type: "email" | "text" | "hidden" | "password"
		validator: formValidation<string>,
	} |
	{
		type: "button"
		color?: string
	} |
	{
		type: "textarea"
		validator: formValidation<string>
	} | {
		type: "select"
		options: string[]
	}
)

export type FormData<T> = {
	values: T
	event: React.FormEvent<HTMLFormElement>
}
export type FormProps<T> = {
	onSubmit: (e: FormData<T>) => void
	inputs: InputField[]
}
export type FormValidationToolTip = {
	isValid: boolean
	message: string
}
export type elementInState = {
	isValid?: boolean
	message?: string
}

export type FormState<T extends elementInState> = {
	values: Partial<T>
}
export default class Form<T> extends BasicComponent<FormProps<T>, FormState<T>> {
	constructor(propsy) {
		super(propsy)
		this.state = { values: {} }

	}


	basicValidator(value: unknown, input: InputField): boolean | FormValidationToolTip {
		if (input.type === "button" || input.isOptional) {
			return true;
		}
		if (!value === undefined || value === null || value === "" || value === 0) {
			return { message: "This field needs to be filled in", isValid: false }
		}
		if (input.type === "number") {
			if (typeof value === "string" && isNaN(parseInt(value, 10))) {
				return { message: "This field needs to be a number", isValid: false }
			}
		}
		return true
	}
	runCustomSetInputValidator(input: InputField, answer: string) {
		if ("validator" in input) {
			if (input.validator) {
				let rawValidator: true | FormValidationToolTip = true
				if (input.type === "number") {
					const asNumber = Number(answer)
					rawValidator = input.validator(asNumber)
				} else {
					rawValidator = input.validator(answer)
				}
				return rawValidator
			}
		}
		return true
	}
	createOnChange(input: InputField) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const rawBasicValidator = this.basicValidator(e.target.value, input)
			let isValid = this.maybeToolTipToBoolean(rawBasicValidator)
			let message: string | undefined = this.getMessageFromMaybeToolTip(rawBasicValidator)
			const customValidatorAnswer = this.runCustomSetInputValidator(input, e.target.value)
			isValid = this.maybeToolTipToBoolean(customValidatorAnswer)
			message = this.getMessageFromMaybeToolTip(customValidatorAnswer)
			const newValue = {
				isValid,
				message,
				value: e.target.value
			}
			const updateState = (st: FormState<T>) => {
				const newSt = { ...st }
				newSt.values[input.name] = newValue
				return newSt
			}
			this.setState(updateState)
		}
	}

	hasBeenInsertedOnce(name) {
		return Boolean(this.state.values[name])
	}
	renderInputGroup(input: InputField) {
		const rawResult = this.checkInputValidity(input)
		const isValid = this.maybeToolTipToBoolean(rawResult)
		const message = this.getMessageFromMaybeToolTip(rawResult)
		return (
			<FormGroup key={input.id}>
				<Row className="justify-content-center">
					<Col xs={6}>
						<Label for={input.id}>{input.label || ""}</Label>
						<FormFeedback tooltip={Boolean(message)} valid={isValid}><p>{message}</p></FormFeedback>
						{this.renderInput(input, { message, isValid })}
					</Col>
				</Row>
			</FormGroup>
		)
	}
	renderInput(input: InputField, tooltip: FormValidationToolTip): JSX.Element {
		let inputElement: JSX.Element;
		const onChange = this.createOnChange(input)
		const hasBeenInserted = this.hasBeenInsertedOnce(input.name)
		switch (input.type) {
			case "button":
				inputElement = (
					<Button
						id={input.id}
						type="submit"
						name={input.name}
						color="success"
						className="ml-1"
					>
						{input.placeholder}
					</Button>
				)
				break;
			case "select":
				inputElement = (
					<Input type="select" name={input.name} id={input.id} onChange={onChange}>
						{
							input.options.map((v, y) => {
								return <option key={y} >{v}</option>
							})
						}
					</Input>
				)
				break
			default:
				const props: {
					key: string,
					valid?: boolean,
					invalid?: boolean,
					"aria-invalid"?: boolean,
					type: InputType,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
					placeholder?: string,
					id: string,
					required: boolean,
					value: string,
					name: string
				} = {
					key: input.name,
					valid: tooltip.isValid,
					invalid: !tooltip.isValid,
					"aria-invalid": !tooltip.isValid,
					type: input.type,
					onChange,
					placeholder: input.placeholder || input.label,
					id: input.id,
					required: !input.isOptional,
					value: input.value ? input.value : '',
					name: input.name
				}
				if (!hasBeenInserted) {
					props.valid = undefined
					props.invalid = undefined
					props["aria-invalid"] = undefined
				}
				inputElement = (
					<Input
						{...props}
					/>
				)
				break;
		}
		return inputElement

	}
	checkInputValidity(input: InputField): boolean | FormValidationToolTip {
		const elInState: elementInState | undefined = this.state.values[input.name]
		let isValid: boolean | FormValidationToolTip = false
		if (elInState) {
			if (elInState.message) {
				isValid = { message: elInState.message, isValid: elInState.isValid || false }
			} else {
				isValid = elInState.isValid || false
			}
		} else {
			isValid = this.basicValidator(this.state.values[input.name], input)
		}
		return isValid
	}
	maybeToolTipToBoolean(tip: boolean | FormValidationToolTip) {
		if (typeof tip === "boolean") {
			return tip
		} else {
			return tip.isValid
		}
	}
	getMessageFromMaybeToolTip(tip: boolean | FormValidationToolTip) {
		if (typeof tip === "boolean") {
			return ""
		}
		return tip.message
	}
	render() {
		const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const isValid = this.props.inputs.every(input => this.maybeToolTipToBoolean(this.checkInputValidity(input)))
			if (!isValid) {
				return;
			}
			const values: Partial<T> = {}
			Object.keys(this.state.values).forEach(key => values[key] = this.state.values[key].value)
			const formData: FormData<T> = {
				values: values as T,
				event: e
			}
			for (let index = 0; index < this.props.inputs.length; index++) {
				if(e.target[index].localName !== 'button') {
					formData.values[e.target[index].name] = e.target[index].value
				}
				if(e.target[index].localName !== 'select' && e.target[index].type !== 'button') {
					e.target[index].value = ''
				} 
				
			}

			this.props.onSubmit(formData)
			this.setState({
				...this.state,
				values: {}
			})
		}
		return (
			<BootForm onSubmit={onSubmit}>
				{this.props.inputs.map(input => this.renderInputGroup(input))}
			</BootForm>
		)
	}
}