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
import SuperDropDown from "src/components/SuperDropDown";
import TextWithSymbols from "src/components/textWithSymbols";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { quantMod } from "src/components/addToCart";

type ProductProps =  props &  {match :match<{id:string}>}
type paramsForLoad = {cardId : cardId}
type renderType = product | undefined
type productState = {modal: boolean}
export default class Products extends BasicComponent<ProductProps,productState> {
    constructor(propsi : ProductProps){
        super(propsi)
        this.renderLowerStats = this.renderLowerStats.bind(this)
        this.renderAbilities  = this.renderAbilities.bind(this)
        this.renderCard       = this.renderCard.bind(this)
        this.getCard          = this.getCard.bind(this)
        this.productAdded     = this.productAdded.bind(this);
        this.state            = {modal:false}
    }
    modOnClick(cart: product, mod: number){
        const cartThing: cartItem = {id: cart.id, name: cart.name, price: "", priceNum : cart.price, quantity : 1, priceTotal : "", priceTotalNum : 0}
        return ()=>quantMod(cartThing, mod, this.props.APIS.req,this.productAdded)
    }
    async productAdded() {
        this.setState({
          modal: !this.state.modal
        });
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
        return <TextWithSymbols text={card.oracleText} />
    }
    renderCard(card :renderType){
        if(!card){
            return <></>
        }
        return (
            <>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.productAdded}>
                    <ModalHeader toggle={this.productAdded}>Product added to cart</ModalHeader>
                    <ModalBody>
                        {"You have added the product : " + card.name + " to your shopping cart."}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.productAdded}>Magical!</Button>{' '}
                        <Button color="secondary" onClick={this.productAdded}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                </div>
                <div className="row justify-content-center">
                    <Col xs="2">
                        <img className="img-fluid" src={card.image}/>
                    </Col>
                    <Col xs="4">
                        <h2 className="titleP border-bottom">{card.name}<TextWithSymbols classSymbols="bigSymbol" text={"{1}{G}{G}"}/></h2>
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
            </>
            )
    }
    async getCard(params : paramsForLoad) : Promise<renderType>{
        const test = await getCard(this.props.APIS.req,params.cardId)
        return test
    }
    render() {
        return (
            <>
                
                <LoadSymbol<paramsForLoad,renderType> 
                    toRender={this.renderCard}
                    params={{cardId:this.props.match.params.id}}
                    getData={this.getCard}
                    
                />
            </>
        );
    }
}