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
import NewDeck from "src/pages/newDeck";
import SearchList from "src/pages/SearchList";


export default class Routes extends BasicPage {
	cardPage = (props :RouteComponentProps<{id:string}>) => <Products
		APIS={this.props.APIS}
		match={props.match}
	/>
	cardListPage = (props : RouteComponentProps<{pageNum:string}>) => <ProductList
		APIS={this.props.APIS}
		match={props.match}
	/>
	searchListPage = (props : RouteComponentProps<{pageNum:string,name:string}>)=><SearchList
		APIS={this.props.APIS}
		match={props.match}

	/>
	deckListPage = (props :RouteComponentProps<{id:string}>) =><DeckList
		APIS={this.props.APIS}
		match={props.match}
	/>
	newDeckPage = (props: RouteComponentProps<{cardId:string}>) => <NewDeck
		APIS={this.props.APIS}
		match={props.match}
	/>
	public render(){
		return (
			<>
				<Switch>
					<Route exact={true} path="/" ><Home/></Route>
					<Route exact={true} path="/register"><Register APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/products"><ProductList APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/search/:name" render={this.searchListPage}/>
					<Route exact={true} path="/search/:name/:pageNum" render={this.searchListPage}/>
					<Route exact={true} path="/products/:pageNum" render={this.cardListPage}/>
					<Route exact={true} path="/cart"><Cart APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/login"><Login APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/contact"><ContactPage APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/product/:id" render={this.cardPage} />
					<Route exact={true} path="/decks"><Decks APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/decks/:id" render={this.deckListPage}/>
					<Route exact={true} path="/deck/new"><NewDeck APIS={this.props.APIS}/></Route>
					<Route exact={true} path="/deck/new/:cardId" render={this.newDeckPage}/>
				</Switch>
			</>
		)
	}

}