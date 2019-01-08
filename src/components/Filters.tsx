import * as React from "react";
import BasicComponent from "src/types/smallComponent";
import { Redirect } from "react-router";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Col from "reactstrap/lib/Col";
import Input from "reactstrap/lib/Input";
import TextWithSymbols from "./textWithSymbols";
import Button from "reactstrap/lib/Button";

type filterState = {
    toSearch: undefined | string;
}
export default class Filters extends BasicComponent<{}, filterState>{
    constructor(props) {
        super(props)
        this.setFilters = this.setFilters.bind(this)
        this.state = { toSearch: undefined }
    }

    async setFilters(e: any) {
        e.preventDefault()
        const values = new FormData(e.target)
        const filtered: { [key: string]: string } = {}
        values.forEach((v, k) => {
            const asTR = v.toString().trim()
            if (asTR !== "") {
                if (k.startsWith("color")) {
                    if (!filtered.color) {
                        filtered.color = ""
                    }
                    filtered.color = filtered.color + k.replace("color", "")
                } else {
                    filtered[k] = asTR
                }
                if (k.startsWith("id")) {
                    if (!filtered.id) {
                        filtered.id = ""
                    }
                    filtered.id = filtered.id + k.replace("id", "")
                } else {
                    filtered[k] = asTR
                }

            }
        })
        this.easySetState(
            {
                toSearch: Object.keys(filtered).map(
                    v => {
                        if (v === "color") {
                            return v + "=" + filtered[v]
                        } else {
                            return v + ":" + filtered[v]
                        }
                    }
                ).join(" ")
            }
        )

    }
    render() {
        if (this.state.toSearch) {
            return <Redirect to={"/search/" + this.state.toSearch} />
        } return (
            <>
                <div className="card">
                    <div className="card-header bold filterHeader">
                        Filters
                        <Button color="primary" size="md" className="moveFilterBar"> 
                            <i className="fas fa-angle-double-left"/>
                        </Button>
                    </div>            
                    <div className="card-body">

                        <Form onSubmit={this.setFilters}>
                            <FormGroup row={true}>
                                <Label for="CardName" sm={3} className="bold">Card Name</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="name" id="CardName" placeholder="Any words in the name, e.g 'Fire'" />
                                </Col>
                            </FormGroup>
                            <FormGroup row={true}>
                                <Label for="Text" sm={3} className="bold">Text</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="oracle" id="Text" placeholder="Any text, e.g 'draw a card'" />
                                </Col>
                            </FormGroup>
                            <FormGroup row={true}>
                                <Label for="TypeLine" sm={3} className="bold">Type Line</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="type" id="TypeLine" placeholder="Enter a type" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleCheckbox" className="bold">Colors</Label>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorW" id="colorW" />
                                    <label className="form-check-label" htmlFor="colorW"><TextWithSymbols text="{W} White" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorU" id="colorU" />
                                    <label className="form-check-label" htmlFor="colorU"><TextWithSymbols text="{U} Blue" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorB" id="colorB" />
                                    <label className="form-check-label" htmlFor="colorB"><TextWithSymbols text="{B} Black" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorR " id="colorR" />
                                    <label className="form-check-label" htmlFor="colorR"><TextWithSymbols text="{R} Red" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorG" id="colorG" />
                                    <label className="form-check-label" htmlFor="colorG"><TextWithSymbols text="{G} Green" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorC " id="colorC" />
                                    <label className="form-check-label" htmlFor="colorC"><TextWithSymbols text="{C} Colorless" /></label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleCheckbox" className="bold">Commander</Label>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="idW" id="idW" />
                                    <label className="form-check-label" htmlFor="idW"><TextWithSymbols text="{W} White"  /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="idU" id="idU" />
                                    <label className="form-check-label" htmlFor="idU"><TextWithSymbols text="{U} Blue" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="idB" id="idB" />
                                    <label className="form-check-label" htmlFor="idB"><TextWithSymbols text="{B} Black" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="idR" id="idR" />
                                    <label className="form-check-label" htmlFor="idR"><TextWithSymbols text="{R} Red" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="idG" id="idG" />
                                    <label className="form-check-label" htmlFor="idG"><TextWithSymbols text="{G} Green" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="idC" id="idC" />
                                    <label className="form-check-label" htmlFor="idC"><TextWithSymbols text="{C} Colorless" /></label>
                                </div>
                            </FormGroup>

                            <FormGroup check={true} row={true}>
                                <Col sm={{ size: 11 }}>
                                    <Button color="submit" block={true}>Filter</Button>
                                </Col>
                            </FormGroup>
                        </Form>

                    </div>
                </div>
            </>
        )
    }

}