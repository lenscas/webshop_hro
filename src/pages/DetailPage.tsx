import * as React from "react";
import BasicComponent from "src/types/basicComponent";
import { getCard, product,cardId, cartItem } from "../services/product";
import LoadSymbol from "../components/loadSymbol";
import { props } from "src/types/BasicProps";
import { match } from "react-router";
import { quantMod } from "src/components/addToCart";
type ProductProps =  props &  {match :match<{id:string}>}
type paramsForLoad = {cardId : cardId}
type renderType = product | undefined
export default class Products extends BasicComponent<ProductProps> {
    constructor(propsi : ProductProps){
        super(propsi)
        this.renderLowerStats = this.renderLowerStats.bind(this)
        this.renderAbilities  = this.renderAbilities.bind(this)
        this.renderCard       = this.renderCard.bind(this)
        this.getCard          = this.getCard.bind(this)
    }
    modOnClick(cart: product, mod: number){
        const cartThing: cartItem = {id: cart.id, name: cart.name, price: "", priceNum : cart.price, quantity : 1, priceTotal : "", priceTotalNum : 0}
        return ()=>quantMod(cartThing, mod)
    }
    renderLowerStats(card: product){
        if(card.toughness && card.power){
            return <h3>Power/Thoughness   : <a>{card.power +"/" + card.toughness}</a></h3>
        } else if(card.loyalty) {
            return card.loyalty
        }
        return ""
    }
    renderAbilities(card:product){
        return <pre>
            {card.oracleText}
        </pre>
    }
    renderCard(card :renderType){
        if(!card){
            return <></>
        }
        return (
            <div className="detail">
                <img className="logo2"src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png"/>
                <img className="cardImage" src={card.image}/>
                <div className="details">
                    <h2 className="titleP">{card.name}<img src="https://i.gyazo.com/0fbff9fe447e21c128869c660bde71ae.png"/></h2>
                    <h3>{card.typeLine}</h3>
                    {this.renderLowerStats(card)}
                    <h3>Price: {card.price}</h3>
                    <button className="btn btn-warning" id="buttonCart" onClick={this.modOnClick(card, 1)}>Add to cart</button>
                </div>
                <div className="detailsText">
                    {this.renderAbilities(card)}
                </div>
            </div>
           )
    }
    async getCard(params : paramsForLoad) : Promise<renderType>{
        const test = await getCard(this.props.APIS.req,params.cardId)
        return test
    }
    render() {
        return <LoadSymbol<paramsForLoad,renderType> 
            toRender={this.renderCard}
            params={{cardId:this.props.match.params.id}}
            getData={this.getCard}
        />
    }
}