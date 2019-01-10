import * as React from "react";
import LoadSymbol from "src/components/loadSymbol";
import BasicPage from "../types/basicComponent";
import { deckList, getDeckList, cardInDeck, deleteCard, addCardToDeck } from "src/services/Decks";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Table from "reactstrap/lib/Table";
import { props } from "src/types/BasicProps";
import Button from "reactstrap/lib/Button";
import OnHoverNearMouse from "src/components/onHoverNearMouse";
import "../style/deckList.css"
import { match, Redirect } from "react-router";
import { retTrue } from "src/funcs/lambdas";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import { FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";
import { Link } from "react-router-dom";
import { searchForDeck } from "src/services/search";
import { productList } from "src/services/product";
import TextWithSymbols from "src/components/textWithSymbols";

type LoadParams = {
	userId: string
	deckId: string
	deletedCards: number
}

type sortedByColor = { [s: string]: cardInDeck[] }
type sortedByCost = { [s: number]: cardInDeck[] }
type sorted = sortedByCost | sortedByColor

type sortOptions = "cost" | "color"

type DeckListProps = props & { match: match<{ id: string }> }
type DeckListState = {
	sortOn: sortOptions
	filterLands: boolean
	selectedCard?: string
	deletedCards: number
	searchTerm?: string
}
export default class DeckList extends BasicPage<DeckListProps, DeckListState>{
	constructor(propsy) {
		super(propsy)
		this.renderCards = this.renderCards.bind(this)
		this.renderList = this.renderList.bind(this)
		this.toggle = this.toggle.bind(this)
		this.deleteCard = this.deleteCard.bind(this)
		this.renderSearch = this.renderSearch.bind(this)
		this.searchLoadSymbol = this.searchLoadSymbol.bind(this)
		this.getCardSearchItems = this.getCardSearchItems.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.state = { sortOn: "color", filterLands: true, deletedCards: 0}
	}
	sortByColor(cards: cardInDeck[]): sortedByColor {
		const sortedList: sortedByColor = {}
		cards.forEach(card => {
			const colors = Object.keys(card.colors).map(v => card.colors[v]).join("")
			if (!sortedList[colors]) {
				sortedList[colors] = []
			}
			sortedList[colors].push(card)
		})
		return sortedList
	}
	sortByCosts(cards: cardInDeck[]): sortedByColor {
		const sortedList: sortedByCost = {}
		cards.forEach(card => {
			if (!sortedList[card.cmc]) {
				sortedList[card.cmc] = []
			}
			sortedList[card.cmc].push(card)
		});
		return sortedList
	}
	sort(cards: cardInDeck[], sortBy: sortOptions): sorted {
		if (sortBy === "cost") {
			return this.sortByCosts(cards)
		}
		return this.sortByColor(cards)
	}
	renderSortButton() {
		let onClick = () => this.easySetState({ sortOn: "color" })
		let text = "Color"
		if (this.state.sortOn === "color") {
			onClick = () => this.easySetState({ sortOn: "cost" })
			text = "Cost"
		}
		return <Button color="success" onClick={onClick} className="alignRight">{text}</Button>
	}
	renderFilterButton() {
		let onClick = () => this.easySetState({ filterLands: false })
		if (!this.state.filterLands) {
			onClick = () => this.easySetState({ filterLands: true })
		}
		return (
			<>
			<Form className="form-inline">
				<div className="form-check mb-2 mr-sm-2">
					<Label className="form-check-label showLands" for="inlineFormCheck ">
						<h4>Show lands :</h4>
					</Label>
					<Input className="form-check-input showLands" type="checkbox" id="inlineFormCheck" onClick={onClick} />
				</div>
					{/* <FormGroup check={true}>
						<Input id="showLands" type="checkbox" onClick={onClick} />
						<span><Label for="showLands" check={true}><h4>Show lands</h4></Label></span>
					</FormGroup> */}
			</Form>
			</>
		)
	}
	renderBuyButton() {
		return <Link to={"/cart/" + this.props.match.params.id} className="btn btn-success">Buy</Link>
	}
	renderCards(cards: Array<cardInDeck | undefined>, extraId: string) {
		return cards.map((card, key) => {
			if (!card) {
				return <td key={extraId + key + Math.random()} />
			}
			const onHover = () => <img className="onHoverImage" src={card.image} />
			const onClick = () => this.easySetState({ selectedCard: card.id })
			const name = () => <span key={extraId + "name" + key}>{card.name}</span>
			return (
				<>
					<td onClick={onClick} key={extraId + card.name + "name" + key} className={"handOnHover"}>
						<OnHoverNearMouse
							onHover={onHover}
							alwaysShow={name}
						/>

					</td>
				</>
			)
		})
	}
	renderColumns(sortedCards: Array<Array<cardInDeck | undefined>>) {
		return sortedCards.map((item, key2) => {
			const key = item.map(card => card && card.name.split(" ").join("") + key2).join("")
			return <tr key={key}>
				{this.renderCards(item, key)}
			</tr>
		})
	}
	renderHead(keys: string[]) {
		return keys.map(v => {
			if (this.state.sortOn === "color") {
				if (v === "") {
					v = "C"
				}
				return { k: v, v: <TextWithSymbols classSymbols="deckPage" key={v} text={v.split("").map(b => "{" + b + "}").join("")} /> }
			}
			return { k: v, v }
		}
		).map(key => <th className="symbolDeck" key={key.k}>{key.v}</th>)
	}
	getOrderOfColors(colors: string) {
		const colorOrder = {
			"W": 1,
			"U": 2,
			"B": 3,
			"R": 4,
			"G": 5
		}
		return colors.split("").map(v => colorOrder[v]).sort()
	}
	onSubmit(e: any) {
		e.preventDefault()
		const data = new FormData(e.target).get("find")
		if (typeof data === "string") {
			this.easySetState({ searchTerm: data })
		}

	}
	async addToDeck(id: string, update: (params: LoadParams) => Promise<void>) {
		await addCardToDeck(this.props.APIS.req, Number(this.props.match.params.id), id)
		update({
			userId: this.props.APIS.userId || "",
			deckId: this.props.match.params.id,
			deletedCards: this.state.deletedCards
		})
	}
	renderSearch(results: productList[], update: (params: LoadParams) => Promise<void>) {
		return <table style={{ "maxWidth": "100%", height: "100%" }}>
			<tbody><tr>
				{results.map(v => {
					const onClick = () => this.addToDeck(v.id, update)
					return <td style={{ height: "40vh" }} key={v.id}><img onClick={onClick} src={v.image} style={{ height: "100%", maxWidth: "auto" }} className="float-left" /></td>
				})}
			</tr>
			</tbody>
		</table>
	}
	async getCardSearchItems(params: { val: string | undefined }) {
		if (params.val) {
			const getResults = await searchForDeck(params.val)
			const result = await getResults(1)
			return result
		}
		else {
			return []
		}
	}
	searchLoadSymbol(update: (params: LoadParams) => Promise<void>) {
		const render = (params: productList[]) => this.renderSearch(params, update)
		return <LoadSymbol<{ val: string | undefined }, productList[] | undefined>
			toRender={render}
			params={{ val: this.state.searchTerm }}
			getData={this.getCardSearchItems}
		/>
	}
	renderList(list: deckList, update: (params: LoadParams) => Promise<void>) {
		let filter: (v: cardInDeck) => boolean = retTrue
		if (this.state.filterLands) {
			filter = (v: cardInDeck) => {
				const lowerTypes = v.typeLine.toLowerCase()
				return !(lowerTypes.includes("land ") || lowerTypes.endsWith("land"))
			}
		}
		const useCards = list.cards.filter(filter)
		useCards.sort((v, k) => {
			if (v.name === k.name) {
				return 0
			}
			if (v.name > k.name) {
				return 1
			}
			return -1
		})
		const sortedList = this.sort(useCards, this.state.sortOn)
		const keys = Object.keys(sortedList)

		keys.sort((key1, key2) => {
			if (key1 === key2) {
				return 0
			}
			if (this.state.sortOn === "color") {
				const order1 = this.getOrderOfColors(key1)
				const order2 = this.getOrderOfColors(key2)
				if (order1.length < order2.length) {
					return -1
				} else if (order1.length > order2.length) {
					return 1
				}
				const isSmaller = order1.every((orderNumber, key) => orderNumber < order2[key])
				if (isSmaller) {
					return -1
				}
				return 1
			}
			if (Number(key1) < Number(key2)) {
				return -1
			}
			return 1
		})
		let biggest = 0
		keys.forEach(key => {
			const count = sortedList[key].length
			if (biggest < count) {
				biggest = count
			}
		})
		const listForTable: Array<Array<cardInDeck | undefined>> = []
		for (let i = 0; i < biggest; i++) {
			const toInsertList: cardInDeck[] = []
			keys.forEach(key => {
				const card = sortedList[key][i]
				toInsertList.push(card)
			})
			listForTable.push(toInsertList)
		}

		return (
			<>
			<div className="p-3 mb-2 deckBar">
				<Row className="justify-content-left">
					<Col md="3">
						<h1 style={{ marginLeft: "15px" }}>{list.commander.name}</h1>
					</Col>
					<Col md="2">
						<FormGroup row={true}>
							<h4 className="seperateText">Sort on : {' '}</h4>
							{this.renderSortButton()}
						</FormGroup>
					</Col>
					<Col md="2">
						{this.renderFilterButton()}
					</Col>
					<Col md="4">
						<form className="find form-inline" onSubmit={this.onSubmit}>
							<div className="input-group mb-2 mr-sm-2">
								
								<input type="text" name="find" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Quick search"/>
								<div className="input-group-append">
									<Button color="secondary" type="submit" id="button-addon2"><i className="fas fa-search"/></Button>
								</div>
							</div>
						</form>
					</Col>
					<Col md="1">
						{this.renderBuyButton()}
					</Col>
				</Row>
				</div>

				<Row style={{ height: "44vh" }} >
					<Col xs={2}>
						<img className="img-fluid" src={list.commander.image} style={{ marginLeft: "15px" }} />
					</Col>
					<Col xs={1} />
					<Col xs={9} style={{ paddingRight: "0" }}>

						<Row className="justify-content-center" style={{ maxWidth: "100%", overflow: "auto", paddingRight: "0", marginRight: "0" }}>
							<Col style={{ height: "100%" }}>
								{this.searchLoadSymbol(update)}
							</Col>
						</Row>

					</Col>
				</Row>
				<Row>
					<Col>
						<Table className="table-sm">
							<thead>
								{this.renderHead(keys)}
							</thead>
							<tbody>
								{this.renderColumns(listForTable)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</>
		)
	}
	toggle() {
		this.setState((st) => ({ ...st, selectedCard: undefined }))
	}
	async deleteCard() {
		if (this.state.selectedCard) {
			await deleteCard(this.props.APIS.req, this.props.match.params.id, this.state.selectedCard)
			this.easySetState({ deletedCards: this.state.deletedCards + 1 }, this.toggle)
		}
	}
	render() {
		if (!this.props.APIS.userId) {
			return <Redirect to="/" />
		}
		const getData = (params: LoadParams) => getDeckList(this.props.APIS.req, params.deckId)
		return (
			<>
				<LoadSymbol<LoadParams, deckList | undefined>
					toRender={this.renderList}
					params={{
						deletedCards: this.state.deletedCards,
						userId: this.props.APIS.userId,
						deckId: this.props.match.params.id
					}}
					getData={getData}
				/>
				<Modal isOpen={!!this.state.selectedCard} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle} />
					<ModalBody>
						What do you want to do?
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.deleteCard}>Delete</Button>
						<Link to={"/product/" + this.state.selectedCard} className="btn btn-primary" >View</Link>{' '}
					</ModalFooter>
				</Modal>
			</>
		)
	}

}