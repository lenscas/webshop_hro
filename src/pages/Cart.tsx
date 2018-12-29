import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, getTotals, cartItem } from "../services/Cart";
import { Link, match } from "react-router-dom";
import LoadSymbol from "src/components/loadSymbol";
import { Table, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { quantMod } from "src/components/addToCart";
import { props } from "src/types/BasicProps";
import { readLocalRaw } from "src/services/localStorage";
import { API, APIReturn } from "src/services/basics";
import { addDeckToCart } from "src/services/Decks";
import "../style/shoppingCart.css"

type CartProps = props & { match?: match<{ deckId: string; }> }
type CartState = {
    erroredCards: string[],
    didLoad: boolean,
    card?: string,
    cardName?: string
    deletedCards: number
}

export default class Cart extends BasicComponent<CartProps, CartState>{

    constructor(propsy) {
        super(propsy);
        this.modOnClick = this.modOnClick.bind(this)
        this.renderCart = this.renderCart.bind(this)
        this.toggle = this.toggle.bind(this)
        this.state = { erroredCards: [], didLoad: false, deletedCards: 0 }
    }

    toggle() {
        this.setState((st) => ({ ...st, card: undefined }))
    }

    async componentDidMount() {
        if (this.props.match) {
            const erroredCards = await addDeckToCart(this.props.APIS.req, this.props.match.params.deckId)
            if (erroredCards && erroredCards.length > 0) {
                this.easySetState({ erroredCards, didLoad: true })
            } else {
                this.easySetState({ didLoad: true })
            }
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
        if (readLocalRaw("token")) {
            await (api.buildRequest("path", "api/order/stock")
                .buildRequest("method", "POST")
                .buildRequest("body", { shoppingcardId: shoppingCartId })
                .buildRequest("converter", (t: APIReturn<{ data: string | string[], success: boolean }>) => {
                    if (t.success === false && t.data instanceof Array) {
                        this.easySetState({ erroredCards: t.data })
                    } else if (t.success === false && typeof t.data === "string") {
                        this.easySetState({ erroredCards: [t.data] })
                    } else {
                        //link to next page
                    }

                    if (update !== undefined) {
                        update({})
                    }
                })).run()
        } else {
            //user order when not loged in
            console.log("user is not logedin")
        }

    }



    async removeCard(api: API) {
        await (api.buildRequest("path", "api/shoppingCart")
            .buildRequest("method", "DELETE")
            .buildRequest("body", { printId: this.state.card })
            .buildRequest("converter", (t: APIReturn<{ data: string | string[], success: boolean }>) => {
                console.log(t.data)
            })).run()
        this.easySetState({ deletedCards: this.state.deletedCards + 1 }, this.toggle)

    }

    renderCart(cart: cartItem[], update: (params: {}) => Promise<void>) {
        if (!cart) {
            return <></>
        }
        console.log(cart)
        const totals = getTotals(cart)
        const body = cart.map((item: cartItem) => {

            const onClick = () => this.easySetState({ card: item.id, cardName: item.name })

            return <tr key={item.id} className="align">
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td key={item.quantity}>
                    <button onClick={this.modOnClick(item, -1, update)}>-</button>

                    {item.quantity}

                    <button onClick={this.modOnClick(item, 1, update)}>+</button>
                </td>
                <td>{item.priceTotal}</td>
                <td>
                    <i className="far fa-trash-alt mouse" onClick={onClick} />
                </td>
            </tr>
        }
        )

        return (
            <div>
                <Table>
                    <thead>
                        <tr className="align">
                            <th>Name</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                        <tr className="align">
                            <th />
                            <th />
                            <th>Total: {totals[0]}</th>
                            <th>Total: € {totals[1]}</th>
                            <th />
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
    renderWarnings() {
        return this.state.erroredCards.map(v => (
            <Alert color="warning">{v}</Alert>
        ))
    }
    render() {
        console.log("render")
        const fetch = async () => await getCart(this.props.APIS.req)

        const click = () => this.removeCard(this.props.APIS.req)
        return (
            <>
                {this.renderWarnings()}
                <LoadSymbol<{ didLoad: boolean, deletedCards: number }, cartItem[]>
                    toRender={this.renderCart}
                    params={{ didLoad: this.state.didLoad, deletedCards: this.state.deletedCards }}
                    getData={fetch}
                />
                <Modal isOpen={!!this.state.card} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} />
                    <ModalBody>
                        are you sure you want to remove {this.state.cardName} from your shopping cart?
					</ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={click}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}