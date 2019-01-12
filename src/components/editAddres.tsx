import * as React from "react";
import { Address } from "../services/users";
import BasicPage from "../types/basicComponent";
import { props } from "src/types/BasicProps";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";
import { APIReturn } from "src/services/basics";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";


type registerState = {
  success?: boolean | { success: boolean, message },
  address: Address
}

export default class EditAddress extends BasicPage<props & { succes: () => void, address: Address }, registerState> {
  constructor(propsy) {
    super(propsy)
    this.state = { address: this.props.address }
  }
  onSubmit = async (e) => {
    e.preventDefault()
    const res = await (
      this.props.APIS.req.buildRequest("path", `api/address/${this.props.address.id}`)
        .buildRequest("method", "PUT")
        .buildRequest("body", this.state.address)
        .buildRequest("converter", (t: APIReturn<boolean>) => ({ success: t.success }))
    ).run<{ success: boolean }>()
    if (res) {
      if (res.success) {
        this.props.succes()
      } else {
        this.setState({
          ...this.state,
          success: false
        })
      }

    }
  }

  onChange = (e, key, field) => {
    const add = this.state[key]
    add[field] = e.target.value
    this.setState({
      ...this.state,
      [key]: add
    })
  }



  renderInput = (key, field, type, name, id, placeholder, title) => {
    const onchange = (e) => this.onChange(e, key, field)
    return (
      <FormGroup>
        <Label for={id}>{title}</Label>
        <Input type={type} name={name} id={id} placeholder={placeholder} value={this.state[key][field]} onChange={onchange}/>
      </FormGroup>
    )
  }

  render() {
    let warnings = <></>
    if (this.state.success !== undefined) {
      if (this.state.success === false) {
        warnings = (
          <Card color="warning">
            <CardBody>
              Something wend wrong, please try again later.
            </CardBody>
          </Card>
        )
      }
    }
    return <>
      {warnings}
      <form onSubmit={this.onSubmit}>
        {this.renderInput('address', 'street', 'text', 'street', 'street', 'import your streetname', 'Street')}
        {this.renderInput('address', 'number', 'number', 'number', 'number', 'import your number', 'Number')}
        {this.renderInput('address', 'zipCode', 'text', 'zipCode', 'zipCode', 'import your zipCode', 'Zipcode')}
        {this.renderInput('address', 'city', 'text', 'number', 'city', 'import your city', 'City')}
        <Button type="submit" onClick={this.onSubmit}>
          Save
        </Button>
      </form>
    </>

  }
}