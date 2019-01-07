import * as React from "react";
import "../style/accordion.css"
import BasicPage from "src/types/basicComponent";
import { props } from "src/types/BasicProps";
import { RouteComponentProps } from "react-router";
const colors = [
    "white",
    "blue",
    "black",
    "red",
    "green",
    "colorless"
]
type test = RouteComponentProps & props
export default class Home extends BasicPage<test> {
    renderCardSelector(name : string){
        const onClick=()=>(void this.props.history.push("/search/color:"+name) )|| this.props.APIS.setBackground(name)
        return (
            <span onClick={onClick} key={name} className={"col accordionItem "+ name}>
                <div>
                    <span>
                        <h2 className="TitleCard">{name}</h2>
                    </span>
                </div>
            </span>
        )
    }
    render() {
        const a = (v:string)=>this.renderCardSelector(v)
        return (
           <>
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <img src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="accordion">
                            <div className="accordionContainer">
                                {colors.map(a)}
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
}