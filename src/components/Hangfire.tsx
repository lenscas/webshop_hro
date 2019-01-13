import BasicPage from "../types/basicComponent";
import { props } from "../types/BasicProps";
import { apiUrl } from "../config";
import * as React from "react";
import Button from "reactstrap/lib/Button";
import { APIReturn } from "src/services/basics";

export default class Hangfire extends BasicPage<props, {}>{

    updatePrice = async () => {
        await (
            this.props.APIS.req.buildRequest("path", `api/admin/cards`)
                .buildRequest("method", "POST")
                .buildRequest("converter", (t: APIReturn<string>) => (console.log(t.data))
                ).run<boolean>())
    }
    updateAllCards = async () => {
        await (
            this.props.APIS.req.buildRequest("path", `api/admin/cards/update`)
                .buildRequest("method", "POST")
                .buildRequest("converter", (t: APIReturn<string>) => (console.log(t.data))
                ).run<boolean>())
    }

    render = () => {
        return (
            <div className="con">
                <Button color="primary" className="button " onClick={this.updateAllCards}>Update All cards</Button>
                <Button color="primary" className="button buttonPrice" onClick={this.updatePrice}>Update Price</Button>
                <iframe src={apiUrl + "hangfire"} className="hangfire" />
            </div>
        )
    }
}