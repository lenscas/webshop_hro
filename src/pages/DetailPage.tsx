import * as React from "react";
import BasicComponent from "src/types/basicComponent";
import { getCard, product,cardId } from "../services/product";
import {cartItem} from "../services/Cart"
import LoadSymbol from "../components/loadSymbol";
import { props } from "src/types/BasicProps";
import { match } from "react-router";
import Col from "reactstrap/lib/Col";
import Price from "src/components/Price";
import Row from "reactstrap/lib/Row";
import Button from "reactstrap/lib/Button";
import SuperDropDown, { dropDownItems } from "src/components/SuperDropDown";
import TextWithSymbols from "src/components/textWithSymbols";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { quantMod } from "src/components/addToCart";
import { decks, getDecks, addCardToDeck } from "src/services/Decks";
import { addDoubleAsync } from "src/funcs/lambdas";
import { Link } from "react-router-dom";

type ProductProps =  props &  {match :match<{id:string}>}
type paramsForLoad = {cardId : cardId}
type renderType = {0:product|undefined, 1: decks[]}// product | undefined
type productState = {modal: boolean, pushedButton : "deck" | "card"}
export default class Products extends BasicComponent<ProductProps,productState> {
    constructor(propsi : ProductProps){
        super(propsi)
        this.renderLowerStats = this.renderLowerStats.bind(this)
        this.renderAbilities  = this.renderAbilities.bind(this)
        this.renderCard       = this.renderCard.bind(this)
        this.getCard          = this.getCard.bind(this)
        this.productAdded     = this.productAdded.bind(this);
        this.getDecks         = this.getDecks.bind(this)
        this.state            = {modal:false,pushedButton:"deck"}
         
    }
    modOnClick(cart: product, mod: number){
        const cartThing: cartItem = {id: cart.id, name: cart.name, price: "", priceNum : cart.price, quantity : 1, priceTotal : "", priceTotalNum : 0}
        return ()=>quantMod(cartThing, mod, this.props.APIS.req,this.productAdded)
    }
    async productAdded() {
        this.easySetState({
          modal: !this.state.modal,
          pushedButton : "card"
        });
    }
    renderLowerStats(card: product){
        if(card.toughness && card.power){
            return <h3 className="magic-font">{card.power +"/" + card.toughness}</h3>
        } else if(card.loyalty) {
            return <h3 className="magic-font">{card.loyalty}</h3>
        }
        return ""
    }
    renderAbilities(card:product){
        return <TextWithSymbols text={card.oracleText} />
    }
    renderDropDOwn(deckList : decks[], printId : cardId){
        return <div className="btn-group">
            <Link to={"/deck/new/"+printId} className="btn btn-secondary">New Deck</Link>
            <SuperDropDown
                caret={true}
                items={
                    deckList.map<dropDownItems>(
                        v=>({
                            text : v.name,
                            onClick : async ()=>{
                                if(await addCardToDeck(this.props.APIS.req, v.id,printId)){
                                    this.easySetState({modal:true,pushedButton:"deck"})
                                }
                            }
                        })
                    )
                }
                text= ""
            />
        </div>
    }
    renderCard(data :renderType){
        const card = data[0]
        if(!card){
            return <></>
        }
        
        const deckList = data[1]
        return (
            <>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.productAdded}>
                    <ModalHeader toggle={this.productAdded}>Product added to cart</ModalHeader>
                    <ModalBody>
                        {this.state.pushedButton === "card" ?
                            "You have added the product : " + card.name + " to your shopping cart."
                            :
                            "You have added the product : " + card.name + " to your deck."
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.productAdded}>Magical!</Button>{' '}
                    </ModalFooter>
                    </Modal>
                </div>
                <div className=" card-page row justify-content-center">
                    <Col xs="2">
                        <img className="img-fluid" src={card.image}/>
                    </Col>
                    <Col xs="4">
                       
                        <h2 className="titleP magic-font">{card.name}<TextWithSymbols classSymbols="bigSymbol" text={card.mana.map(v => v.strSymbol).join("")}/></h2>
                        <h3 className="magic-font">{card.typeLine}</h3>
                        {this.renderAbilities(card)}
                        {this.renderLowerStats(card)}
                        <Row>
                            <Col>
                                <h3>Price: <Price price={card.price}/></h3>
                            </Col>
                            <Col>
                                <button onClick={this.modOnClick(card, 1)} className="btn btn-success float-right" id="buttonCart">Add to cart</button>
                            </Col>
                            <Col>
                                {this.renderDropDOwn(deckList,card.id)}
                            </Col>
                        </Row>
                    </Col>
                </div>
            </>
            )
    }
    async getCard(params : paramsForLoad) : Promise<product |undefined>{
        return await getCard(this.props.APIS.req,params.cardId)

    }
    async getDecks() : Promise<decks[]>{
        try{
            return await getDecks(this.props.APIS.req);
        }
        catch(e){
            return []
        }
    }
    render() {
        const getData = addDoubleAsync<product |undefined,decks[],paramsForLoad>(
            this.getCard,
            this.getDecks
        );
        return (
            <>
                
                <LoadSymbol<paramsForLoad,renderType> 
                    toRender={this.renderCard}
                    params={{cardId:this.props.match.params.id}}
                    getData={getData}
                    
                />
            </>
        );
    }
}