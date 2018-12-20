import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, getTotals, cartItem } from "../services/Cart";
import { Link, match } from "react-router-dom";
import LoadSymbol from "src/components/loadSymbol";
import { Table, Alert } from 'reactstrap';
import { quantMod } from "src/components/addToCart";
import { props } from "src/types/BasicProps";
import { readLocalRaw, storeLocal } from "src/services/localStorage";
import { API, APIReturn } from "src/services/basics";
import { addDeckToCart } from "src/services/Decks";
// import { storeLocal } from "src/services/localStorage";

// storeLocal("cart",
//  [
//      {id: "1", name : "Black Lotus",price: "", priceNum : 3000000.00, quantity : 6, priceTotal : "", priceTotalNum : 0},
//     {id: "2",name : "Blaze", price: "", priceNum : 4.00, quantity : 1, priceTotal : "", priceTotalNum : 0},
//     {id: "3",name : "Thran Turbine", price: "", priceNum : 300, quantity : 3, priceTotal : "", priceTotalNum : 0},
//     {id: "4",name : "Marrow-Gnawer", price: "", priceNum : 40, quantity : 99, priceTotal : "", priceTotalNum : 0}
// ]
//  )
type CartProps = props & {match? : match<{ deckId: string; }>}
type CartState = {
    erroredCards : string[],
    didLoad : boolean
}

export default class Cart extends BasicComponent<CartProps,CartState>{

    constructor(propsy) {
        super(propsy);
        this.modOnClick = this.modOnClick.bind(this)
        this.renderCart = this.renderCart.bind(this)
        this.state = {erroredCards:[],didLoad:false}
    }
    async componentDidMount(){
        if(this.props.match){
            const erroredCards = await addDeckToCart(this.props.APIS.req,this.props.match.params.deckId)
            if(erroredCards && erroredCards.length > 0 ){
                this.easySetState({erroredCards,didLoad:true})
            } else {
                this.easySetState({didLoad:true})
            }
            
            //this.forceUpdate()
        }
    }
    modOnClick(cartThing: cartItem, mod: number, update: (params: {}) => Promise<void>) {
        return async () => quantMod(cartThing, mod, this.props.APIS.req, update)
    }

    orderOnClick(api: API, update: (params: {}) => Promise<void>) {
        return _ => (this.order(api, update))
    }

    async order(api: API, update?: (params: {}) => Promise<void>) {
        const shoppingCartId = readLocalRaw("shoppingCartId")
        await (api.buildRequest("path", "api/order")
            .buildRequest("method", "POST")
            .buildRequest("body", { shoppingcardId: shoppingCartId })
            .buildRequest("converter", (t: APIReturn<{ data: string, success: boolean }>) => {
                storeLocal("cart", [])
                if (update !== undefined) {
                    update({})
                }
            })).run()
    }
    renderCart(cart: cartItem[], update: (params: {}) => Promise<void>) {
        console.log(cart)
        if (!cart) {
            return <></>
        }
        const totals = getTotals(cart)
        const body = cart.map((item: cartItem) => {

            return <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td key={item.quantity}>
                    <button onClick={this.modOnClick(item, -1, update)}>-</button>

                    {item.quantity}

                    <button onClick={this.modOnClick(item, 1, update)}>+</button>
                </td>
                <td>{item.priceTotal}</td>
            </tr>
        }
        )

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                        <tr>
                            <th />
                            <th />
                            <th>Total: {totals[0]}</th>
                            <th>Total: € {totals[1]}</th>
                        </tr>
                    </tbody>
                </Table>
                <button onClick={this.orderOnClick(this.props.APIS.req, update)}>Order</button>
            </div>
        )
    }

    makeLink(p: cartItem) {
        return {
            key: "iets",
            element: (
                <Link to={`/product/${p.id}`}>
                    {p.name}
                </Link>
            )
        }
    }
    renderWarnings(){
        return this.state.erroredCards.map(v=>(
            <Alert color="warning">{v} is out of stock.</Alert>
        ))
    }
    render() {
        const fetch = async () => await getCart(this.props.APIS.req)
        return (
            <>
                {this.renderWarnings()}
                <LoadSymbol<{didLoad :boolean}, cartItem[]>
                    toRender={this.renderCart}
                    params={{didLoad :this.state.didLoad}}
                    getData={fetch}
                />
            </>
        )
    }
}