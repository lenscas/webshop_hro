import * as React from "react";
import "../style/accordion.css"
import { Link } from "react-router-dom";
const colors = [
    "white",
    "blue",
    "black",
    "red",
    "green",
    "colorless"
]
export default class Home extends React.Component {
    renderCardSelector(name : string){
        return (
            <Link to="/products" key={name} className={"col accordionItem "+ name}>
                <div>
                    <span>
                        <h2 className="TitleCard">{name}</h2>
                    </span>
                </div>
            </Link>
        )
    }
    render() {
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
                                {colors.map(this.renderCardSelector)}
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
}