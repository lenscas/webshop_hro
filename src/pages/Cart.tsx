import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, getTotals, cartItem } from "../services/Cart";
import { Link, match, Redirect } from "react-router-dom";
import LoadSymbol from "src/components/loadSymbol";
import { Table, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { quantMod } from "src/components/addToCart";
import { props } from "src/types/BasicProps";
import { readLocalRaw, removeLocal, readLocal, storeLocal } from "src/services/localStorage";
import { API, APIReturn } from "src/services/basics";
import { addDeckToCart } from "src/services/Decks";
import "../style/shoppingCart.css"
import { nothing } from "src/funcs/lambdas";

type CartProps = props & { match?: match<{ deckId: string; }> }
type CartState = {
    erroredCards: string[],
    didLoad: boolean,
    card?: string,
    cardName?: string,
    deletedCards: number,
    redirect: boolean,
    clearCart: boolean
}

export default class Cart extends BasicComponent<CartProps, CartState>{

    constructor(propsy) {
        super(propsy);
        this.modOnClick = this.modOnClick.bind(this)
        this.renderCart = this.renderCart.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleClear = this.toggleClear.bind(this)
        this.state = { erroredCards: [], didLoad: false, deletedCards: 0, redirect: false, clearCart: false }
    }

    toggle() {
        this.setState((st) => ({ ...st, card: undefined }))
    }

    toggleClear() {
        this.easySetState({ clearCart: false })
    }

    clear = async (update: (params: {}) => Promise<void>) => {
        const shoppingcart = readLocal<number>('shoppingCartId')
        console.log(shoppingcart)
        if (shoppingcart) {
            console.log('test')
            await this.props.APIS.req.buildRequest("path", `api/shoppingCart/${shoppingcart}/range`)
                .buildRequest("method", "DELETE")
                .buildRequest("converter", (t: APIReturn<boolean>) => ({ success: t.success }))
                .run()
        }
        removeLocal('cart');
        if(update) {
            update({ deletedCards: this.state.deletedCards + 1})
        }
        this.toggleClear();

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
                        this.setState({ ...this.state, redirect: true })

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
        const shoppingcart = readLocal<number>('shoppingCartId')
        if(shoppingcart) {
            await (api.buildRequest("path", "api/shoppingCart")
            .buildRequest("method", "DELETE")
            .buildRequest("body", { printId: this.state.card })
            .buildRequest("converter", (t: APIReturn<{ data: string | string[], success: boolean }>) => nothing)).run()
        this.easySetState({ deletedCards: this.state.deletedCards + 1 }, this.toggle)
        }
        const sc = readLocal<cartItem[]>('cart');
        const newSc:cartItem[] = []
        if(sc) {
            sc.forEach(v => {
                if(v.id !== this.state.card) {
                    newSc.push(v)
                }
            })
            storeLocal('cart', newSc)
            this.easySetState({ deletedCards: this.state.deletedCards + 1 }, this.toggle)
        }
        

    }

    renderCart(cart: cartItem[], update: (params: {}) => Promise<void>) {
        if (!cart) {
            return <></>
        }
        if (this.state.redirect) {
            return <Redirect to="/cart/pay" />
        }
        const totals = getTotals(cart)
        const body = cart.map((item: cartItem) => {

            const onClick = () => this.easySetState({ card: item.id, cardName: item.name })

            const handleOnChange = (event) => {
                if (event.target.value.length === 0 || event.target.value === 0) {
                    event.target.value = 1
                }
                quantMod(item, event.target.value, this.props.APIS.req, update)
            }

            return <tr key={item.id} id="cartBold" className="align">
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td key={item.quantity} className="plusMinus">
                    <input type='button' value='-' className='qtyminus' onClick={this.modOnClick(item, item.quantity + -1, update)} />
                    <input type='text' name='quantity' value={item.quantity} className='qty' onChange={handleOnChange} />
                    <input type='button' value='+' className='qtyplus' onClick={this.modOnClick(item, item.quantity + 1, update)} />
                </td>
                <td>{item.priceTotal}</td>
                <td>
                    <i className="far fa-trash-alt mouse" onClick={onClick} />
                </td>
            </tr>
        }
        )

        const clearCartModal = () => this.easySetState({ clearCart: true })

        const clearCart = () => {
           this.clear(update)
        }

        return (
            <>
                <div className="cartPage">
                    <Table>
                        <thead>
                            <tr className="align">
                                <th className="koppen">Name</th>
                                <th className="koppen">Price</th>
                                <th className="koppen">Amount</th>
                                <th className="koppen">Total Price</th>
                                <th className="koppen">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {body}
                            <tr className="align">
                                <th />
                                <th />
                                <th>Total: {totals[0]}</th>
                                <th>Total: € {totals[1]}</th>
                                <th>
                                    <button className="btn btn-danger" onClick={clearCartModal}>Clear</button>
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                    <button id="orderKnop" className="btn btn-primary" onClick={this.orderOnClick(this.props.APIS.req, update)}>Proceed to checkout</button>
                </div>
                <Modal isOpen={this.state.clearCart} toggle={this.toggleClear}>
                    <ModalHeader toggle={this.toggleClear} />
                    <ModalBody>
                        Are you sure you want to clear your shopping cart?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={clearCart}>Clear</Button>
                    </ModalFooter>
                </Modal>
            </>
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
            <Alert key={v} color="warning">{v}</Alert>
        ))
    }
    render() {
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