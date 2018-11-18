import * as React from "react";
import BasicPage from "src/types/basicComponent";
import LoadSymbol from "src/components/loadSymbol";
import { decks, getDecks } from "src/services/Decks";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import OnHoverNearMouse from "src/components/onHoverNearMouse";
import { Link } from "react-router-dom";
import "../style/deckList.css"
type loadParams = {}
export default class Decks extends BasicPage{
	constructor(props){
		super(props)
		this.renderList = this.renderList.bind(this)
		this.getData = this.getData.bind(this)
	}
	renderColl(decksInRow : decks[]){
		return decksInRow.map(deck=>{
			const onHover = ()=><img className="img-fluid onHoverImage" src={deck.fullImage}/>
			return <Col xs="4" key={deck.id}>
				<Link to={"/decks/"+deck.id}>
					<OnHoverNearMouse
						onHover = {onHover}
						alwaysShow = {(
							<>
								<Row>
									<Col>
										<img className="img-fluid" src={deck.image}/>
									</Col>
								</Row>
								<Row>
									<Col>
										<h3>{deck.name}</h3>
									</Col>
								</Row>
							</>
						)}
					/>

				</Link>
			</Col>
		})
	}
	renderRows(allDecks: decks[][]){
		return allDecks.map(row=>(
			<Row key={row.map(v=>v.id).join("")}>
				{this.renderColl(row)}
			</Row>
		))
	}
	renderList(allDecks :decks[]){
		const inThrees : decks[][] = []
		let last : decks[] = []
		allDecks.forEach(deck=>{
			if(last.length === 3){
				inThrees.push(last)
				last = []

			}
			last.push(deck)
		})
		inThrees.push(last)
		return <Row className="justify-content-center"><Col xs={10}>{this.renderRows(inThrees)}</Col></Row>
	}
	getData(){
		return getDecks(this.props.APIS.req)
	}
	render(){
		return <LoadSymbol<loadParams, decks[]>
			toRender = {this.renderList}
			params = {{}}
			getData={this.getData}
		/>
	}
}