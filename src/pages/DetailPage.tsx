import * as React from "react";
import BasicComponent from "src/types/basicComponent";
import { getCard, product,cardId } from "../services/product";
import {cartItem} from "../services/Cart"
import LoadSymbol from "../components/loadSymbol";
import { props } from "src/types/BasicProps";
import { match } from "react-router";
import { quantMod } from "src/components/addToCart";
import Col from "reactstrap/lib/Col";
import Price from "src/components/Price";
import Row from "reactstrap/lib/Row";
import Button from "reactstrap/lib/Button";
import SuperDropDown from "src/components/SuperDropDown";
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
        return ()=>quantMod(cartThing, mod, this.props.APIS.req)
    }
    renderLowerStats(card: product){
        if(card.toughness && card.power){
            return <h3 className="border-bottom">{card.power +"/" + card.toughness}</h3>
        } else if(card.loyalty) {
            return <h3 className="border-bottom">{card.loyalty}</h3>
        }
        return ""
    }
    renderAbilities(card:product){
        return <pre className="border-bottom">
            {card.oracleText}
        </pre>
    }
    renderCard(card :renderType){
        if(!card){
            return <></>
        }
        return (
            <div className="row justify-content-center">
                <Col xs="2">
                    <img className="img-fluid" src={card.image}/>
                </Col>
                <Col xs="4">
                    <h2 className="titleP border-bottom">{card.name}<img src="https://i.gyazo.com/0fbff9fe447e21c128869c660bde71ae.png"/></h2>
                    <h3 className="border-bottom">{card.typeLine}</h3>
                    {this.renderAbilities(card)}
                    {this.renderLowerStats(card)}
                    <Row>
                        <Col>
                            <h3>Price: <Price price={card.price}/></h3>
                        </Col>
                        <Col>
                            <button onClick={this.modOnClick(card, 1)} className="btn btn-warning float-right" id="buttonCart">Add to cart</button>
                        </Col>
                        <Col>
                            <div className="btn-group">
                                <Button color="secondary">New Deck</Button>
                                <SuperDropDown
                                    caret={true}
                                    items={[{
                                        text:"Ach, Hans Run!",
                                        header:true,

                                    }]}
                                    text= ""
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
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