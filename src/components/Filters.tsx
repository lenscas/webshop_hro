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
    show:boolean
}
export default class Filters extends BasicComponent<{}, filterState>{
    constructor(props) {
        super(props)
        this.setFilters = this.setFilters.bind(this)
        this.showFilters = this.showFilters.bind(this)
        this.state = { toSearch: undefined,show:true }
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
    showFilters(){
        this.easySetState({show:!this.state.show})
    }
    render() {
        if (this.state.toSearch) {
            return <Redirect to={"/search/" + this.state.toSearch} />
        }
        //const closedFilter = "fas fa-angle-double-left" // if used again change const to let
        const noDisplay :string |undefined = undefined
        const container ="2"
        const left :string | number ="0"
        /*if(!this.state.show){
          left="0px"
          container="1"
          noDisplay ="none"
          closedFilter ="fas fa-angle-double-right"
        }    */
        console.log(left)
        return (
            <div className={"col-md-"+container} style={{paddingLeft: "0"}}>
            <div style ={{position:"relative", left, top:"0"}}>
                <div className="card" style={{height:"94vh"}} >
                    <div className="card-header bold filterHeader">
                    <FormGroup>
                    <Col >
                        Filters
                        </Col>
                        {/* <Col >
                        <Button color="primary" size="md" className="moveFilterBar" onClick={this.showFilters}> 
                            <i className={closedFilter}/>
                        </Button>
                        </Col> */}
                        </FormGroup>
                    </div>            
                    <div className="card-body" style ={{paddingBottom: "16px", paddingLeft:"4vh",display: noDisplay, maxHeight:"93vh", overflow:"auto"}}>

                        <Form onSubmit={this.setFilters}>
                            <FormGroup >
                                <Label for="CardName" className="bold">Card Name</Label>
                                    <Input type="textarea" name="name" id="CardName" placeholder="Any words in the name, e.g 'Fire'" />
                            </FormGroup>
                            <FormGroup >
                                <Label for="Text" className="bold">Text</Label>
                                    <Input type="textarea" name="oracle" id="Text" placeholder="Any text, e.g 'draw a card'" />
                            </FormGroup>
                            <FormGroup >
                                <Label for="TypeLine" className="bold">Type Line</Label>
                                    <Input type="textarea" name="type" id="TypeLine" placeholder="Enter a type" />
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
                                    <input type="checkbox" className="form-check-input" name="colorR" id="colorR" />
                                    <label className="form-check-label" htmlFor="colorR"><TextWithSymbols text="{R} Red" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorG" id="colorG" />
                                    <label className="form-check-label" htmlFor="colorG"><TextWithSymbols text="{G} Green" /></label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="colorC" id="colorC" />
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

                            <FormGroup check={true} >
                                <Col sm={{ size: 10 }}>
                                    <Button color="submit" block={true}>Filter</Button>
                                </Col>
                            </FormGroup>
                        </Form>

                    </div>
                </div>
                </div>
            </div>
        )
    }

}