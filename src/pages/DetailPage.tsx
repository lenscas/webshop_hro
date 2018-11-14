import * as React from "react";
import BasicComponent from "src/types/basicComponent";

export default class Products extends BasicComponent {

    render() {
        return (
                <div className="detail">
                    <img className="logo2"src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png"/>
                    <img className="cardImage" src="https://img.scryfall.com/cards/large/en/ima/18.jpg?1530591663"/>
                    <div className="details">
                        <h2 className="titleP">Elesh Norn, Grand Cenobite <img src="https://i.gyazo.com/0fbff9fe447e21c128869c660bde71ae.png"/></h2>
                        <h3>Legendary Creature : <a>Praetor</a></h3>
                        <h3>Power/Thoughness   : <a>4/7</a></h3>
                        <h3>Price: €12,73</h3>
                        <button className="btn btn-warning" id="buttonCart">Add to cart</button>
                    </div>
                    <div className="detailsText">
                    Vigilance

Other creatures you control get +2/+2.

Creatures your opponents control get -2/-2.

“The Gitaxians whisper among themselves of other worlds. If they exist, we must bring Phyrexia’s magnificence to them.”
                    </div>
                </div>
               )
        }
    }