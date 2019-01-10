import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import BasicPage from "../types/basicComponent";
import Register from "../pages/Register";
import ProductList from "../pages/ProductList";
import Login from "../pages/LoginPage";
import Home from "src/pages/HomePage";
import Products from "src/pages/DetailPage";
import ContactPage from "src/pages/ContactPage";
import Cart from "src/pages/Cart"
import Decks from "src/pages/decks";
import DeckList from "src/pages/DeckList";
import UserPage from "src/pages/UserPage";
import NewDeck from "src/pages/newDeck";
import SearchList from "src/pages/SearchList";
import Admin from "src/pages/Admin";
import { StaticContext } from "react-router";
import Pay from "src/pages/Pay";
import Filters from "./Filters";


export default class Routes extends BasicPage {
	cardPage = (props: RouteComponentProps<{ id: string }>) => <Products
		APIS={this.props.APIS}
		match={props.match}
	/>
	cardListPage = (props: RouteComponentProps<{ pageNum: string }>) => <ProductList
		APIS={this.props.APIS}
		match={props.match}
	/>
	searchListPage = (props: RouteComponentProps<{ pageNum: string, name: string }>) => <SearchList
		APIS={this.props.APIS}
		match={props.match}

	/>
	deckListPage = (props: RouteComponentProps<{ id: string }>) => <DeckList
		APIS={this.props.APIS}
		match={props.match}
	/>
	newDeckPage = (props: RouteComponentProps<{ cardId: string }>) => <NewDeck
		APIS={this.props.APIS}
		match={props.match}
	/>
	renderCart = (props: RouteComponentProps<{ deckId: string }>) => <Cart
		APIS={this.props.APIS}
		match={props.match}
	/>
	renderHome = (props: RouteComponentProps<any, StaticContext, any>) => <Home
		match={props.match}
		history={props.history}
		location={props.location}
		APIS={this.props.APIS}
	/>

	public render() {
		return (
			<div className="bgTrans row">
				<div className="col">
					<Switch>
						<Route exact={true} path="/" render={this.renderHome} />
						<Route exact={true} path="/register"><Register APIS={this.props.APIS} /></Route>
						<Route path="/(search|products)/*">
							<div className="row">
								<Filters/>
								<div className="col" style={{maxHeight:"94vh", overflow:"auto"}}>
									<Switch>
										<Route exact={true} path="/products/"><ProductList APIS={this.props.APIS} /></Route>
										<Route exact={true} path="/products/:pageNum" render={this.cardListPage} />
										<Route exact={true} path="/search/:name" render={this.searchListPage} />
										<Route exact={true} path="/search/:name/:pageNum" render={this.searchListPage} />
									</Switch>
								</div>
							</div>
						</Route>
						
						
						<Route exact={true} path="/cart"><Cart APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/cart/pay"><Pay APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/cart/:deckId" render={this.renderCart} />
						<Route exact={true} path="/login"><Login APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/contact"><ContactPage APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/product/:id" render={this.cardPage} />
						<Route exact={true} path="/decks"><Decks APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/decks/:id" render={this.deckListPage} />
						<Route exact={true} path="/user"><UserPage APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/deck/new"><NewDeck APIS={this.props.APIS} /></Route>
						<Route exact={true} path="/deck/new/:cardId" render={this.newDeckPage} />
						<Route exact={true} path="/admin"><Admin APIS={this.props.APIS} /></Route>
					</Switch>
				</div>
			</div>
		)
	}

}