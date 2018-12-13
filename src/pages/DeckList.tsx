import * as React from "react";
import LoadSymbol from "src/components/loadSymbol";
import BasicPage from "../types/basicComponent";
import { deckList, getDeckList, cardInDeck } from "src/services/Decks";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Table from "reactstrap/lib/Table";
import { props } from "src/types/BasicProps";
import Button from "reactstrap/lib/Button";
import OnHoverNearMouse from "src/components/onHoverNearMouse";
import "../style/deckList.css"
import { match} from "react-router";
import { retTrue } from "src/funcs/lambdas";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import { FormGroup} from "reactstrap";
import { Link } from "react-router-dom";


type LoadParams = {
	userId : string
	deckId : string
}

type sortedByColor = {[s : string]:cardInDeck[]}
type sortedByCost = {[s:number] : cardInDeck[]}
type sorted = sortedByCost | sortedByColor

type sortOptions = "cost" | "color"

type DeckListProps = props & {match : match<{id:string}>}
type DeckListState = {
	sortOn :sortOptions
	filterLands : boolean
}
export default class DeckList extends BasicPage<DeckListProps,DeckListState>{
	constructor(propsy){
		super(propsy)
		this.renderCards = this.renderCards.bind(this)
		this.renderList = this.renderList.bind(this)
		this.state = {sortOn : "color",filterLands:true}
	}
	sortByColor(cards:cardInDeck[]) : sortedByColor {
		const sortedList : sortedByColor = {}
		cards.forEach(card=>{
			const colors = Object.keys(card.colors).map(v=>card.colors[v]).join("")
			if(!sortedList[colors]){
				sortedList[colors] = []
			}
			sortedList[colors].push(card)
		})
		return sortedList
	}
	sortByCosts(cards:cardInDeck[]): sortedByColor {
		const sortedList: sortedByCost = {}
		cards.forEach(card => {
			if(!sortedList[card.cmc]){
				sortedList[card.cmc] = []
			}
			sortedList[card.cmc].push(card)
		});
		return sortedList
	}
	sort(cards:cardInDeck[],sortBy:sortOptions):sorted {
		if(sortBy==="cost"){
			return this.sortByCosts(cards)
		}
		return this.sortByColor(cards)
	}
	renderSortButton(){
		let onClick = ()=>this.easySetState({sortOn:"color"})
		let text = "Color"
		if(this.state.sortOn==="color"){
			onClick = ()=>this.easySetState({sortOn:"cost"})
			text= "Cost"
		}
		return <Button color="success" onClick={onClick}>{text}</Button>
	}
	renderFilterButton(){
		let onClick = ()=>this.easySetState({filterLands:false})
		if(!this.state.filterLands){
			onClick = ()=>this.easySetState({filterLands:true})
		}
		return (
			<FormGroup check={true}>
				<Input id="showLands" type="checkbox" onClick={onClick}/>
				<span><Label for="showLands" check={true}>Show lands</Label></span>
				
			</FormGroup>
		)
	}
	renderBuyButton(){
		return <Link to={"/cart/"+this.props.match.params.id} className="btn btn-success">Buy</Link>
	}
	renderCards(cards : Array<cardInDeck | undefined>,extraId:string){
		return cards.map( (card,key)=>{
			if(!card){
				return <td key={extraId+key} colSpan={2}/>
			}
			const onHover = ()=><img className="onHoverImage" src={card.image}/>
			const name = ()=>card.name
			return(
				<>
					<td key={extraId+card.name+"name"}>
						<OnHoverNearMouse
							onHover={onHover}
							alwaysShow={name}
						/>

					</td>
				</>
			)
		})
	}
	renderColumns(sortedCards : Array<Array<cardInDeck|undefined>>) {
		return sortedCards.map(item=>{
			const key = item.map(card=>card && card.name.split(" ").join("")).join("")
			return <tr key={key}>
				{this.renderCards(item,key)}
			</tr>
		})
	}
	renderHead(keys:string[]){
		return keys.map(key=><th key={key} className="text-center">{key}</th>)
	}
	getOrderOfColors(colors : string){
		const colorOrder = {
			"W":1,
			"U":2,
			"B":3,
			"R":4,
			"G":5
		}
		return colors.split("").map(v=>colorOrder[v]).sort()
	}
	renderList(list : deckList){
		let filter : (v:cardInDeck)=>boolean = retTrue
		if(this.state.filterLands){
			filter = (v : cardInDeck)=>{
				const lowerTypes = v.typeLine.toLowerCase()
				return !(lowerTypes.includes("land ") || lowerTypes.endsWith("land"))
			}
		}
		const useCards = list.cards.filter(filter) 
		useCards.sort( (v,k)=>{
			if(v.name === k.name){
				return 0
			}
			if(v.name > k.name){
				return 1
			}
			return -1
		})
		const sortedList = this.sort(useCards,this.state.sortOn)
		const keys = Object.keys(sortedList)

		keys.sort( (key1,key2)=>{
			if(key1===key2){
				return 0
			}
			if(this.state.sortOn==="color"){
				const order1 = this.getOrderOfColors(key1)
				const order2 = this.getOrderOfColors(key2)
				if(order1.length < order2.length){
					return -1
				} else if(order1.length > order2.length){
					return 1
				}
				const isSmaller = order1.every( (orderNumber,key)=>orderNumber < order2[key])
				if(isSmaller){
					return -1
				}
				return 1
			}
			if(Number(key1) < Number(key2)){
				return -1
			}
			return 1
		})
		let biggest = 0
		keys.forEach(key=>{
			const count = sortedList[key].length
			if(biggest < count){
				biggest = count
			}
		})
		const listForTable : Array<Array<cardInDeck | undefined>> = []
		for (let i = 0; i < biggest; i++) {
			const toInsertList : cardInDeck[] = []
			keys.forEach(key=>{
				const card = sortedList[key][i]
				toInsertList.push(card)
			})
			listForTable.push(toInsertList)
		}
		return (
			<>
				<Row>
					<Col xs={2}>
						<h1>{list.commander.name}</h1>
						<img className="img-fluid" src={list.commander.image}/>
					</Col>
					<Col xs={1}/>
					<Col>
						<h1>Hier is nog plaats voor andere dingen</h1>
						{this.renderBuyButton()}
						{this.renderSortButton()}
						{this.renderFilterButton()}
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
	render(){
		if(!this.props.APIS.userId){
			this.props.APIS.setUserId("1");
			return null;
		}
		const getData = (params : LoadParams)=>getDeckList(this.props.APIS.req,params.deckId)
		return (
			<LoadSymbol<LoadParams,deckList | undefined>
				toRender = {this.renderList}
				params = {{userId : this.props.APIS.userId, deckId:this.props.match.params.id}}
				getData ={getData}
			/>
		)
	}

}