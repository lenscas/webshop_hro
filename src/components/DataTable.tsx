import * as React from "react";
import Table from "reactstrap/lib/Table";
import LoadSymbol from "./loadSymbol";
import { defaultTrue } from "src/funcs/easyDefaults";
import BasicComponent from "src/types/smallComponent";
import PageButtons from "./pageButtons";
import { Redirect } from "react-router";

export type renderable = {
	key : string | number
	element : string | JSX.Element
}
type TableProps<T> = {
	fetch : (pageNR : number) => Promise<T[]>
	render : (line : T)=>renderable[]
	pageNumber: number
	setUrlHandler : (param: string)=>string
	head? : string[]
	foot? : Array<string| renderable>
	striped? : boolean
	hover?: boolean
	equalWidth? : boolean
	borderLess? : boolean

}
type TableState = {
	newPageNumber : number
}
export type getDataParams = {
	pageNum : number
}

export default class DataTable<T> extends BasicComponent<TableProps<T>,TableState> {
	constructor(propsy : TableProps<T>){
		super(propsy)
		this.state = {newPageNumber:this.props.pageNumber}
		this.renderTable = this.renderTable.bind(this)
		this.getData = this.getData.bind(this)
		this.setPageNumberState = this.setPageNumberState.bind(this)
	}
	async getData(params : getDataParams){
		const results = await this.props.fetch(params.pageNum)

		const lines = results.map(
			line=>this.props.render(line)
		)
		return lines
	}
	renderHead(){
		if(this.props.head){
			return this.props.head.map(val=><th key={val}>{val}</th>)
		}
		return <></>

	}
	renderFoot(){
		if(this.props.foot){
			return this.props.foot.map(val=>{
				if(typeof val ==="string"){
					return <th key={val}>{val}</th>
				} else {
					return  <th key={val.key}>{val.element}</th>
				}
			})
		
		}
		return <></>

	}
	renderBody(lines){
		
		let rowClass= ""
		if(this.props.equalWidth){
			rowClass= "d-flex"
		}
		return lines.map( (v,k)=><tr className={rowClass} key={k}>{this.renderLine(v)}</tr>)
	}
	renderLine(line : renderable[]){
		let colClass = ""
		if(this.props.equalWidth){
			const size = 12 / line.length
			colClass = "col-"+size.toString()
		}
		return (
			line.map(val=><td className={colClass} key={val.key}>{val.element}</td>)
		)
	}
	hover(){
		return defaultTrue(this.props.hover)
	}
	striped(){
		return defaultTrue(this.props.striped)
	}
	setPageNumberState(newPageNum:number){
		this.easySetState({newPageNumber:newPageNum})
	}
	renderTable(lines : renderable[][]){
		if(this.state.newPageNumber !== this.props.pageNumber){
			return <Redirect to={this.props.setUrlHandler(this.state.newPageNumber.toString())}/>
		}
		const buttons =(
			<PageButtons
				setNewNumber={this.setPageNumberState}
				page={this.props.pageNumber}
			/>
		)
		return (
			<>
				{buttons}
				<Table striped={this.striped()} responsive={true} hover={this.hover()} borderless={this.props.borderLess !== undefined && this.props.borderLess} >
					<thead>
						<tr>
							{this.renderHead()}
						</tr>
					</thead>
					<tbody>
						{this.renderBody(lines)}
					</tbody>
					<tfoot>
						<tr>
							{this.renderFoot()}
						</tr>
					</tfoot>
				</Table>
				{buttons}
			</>
		)
	}
	render(){
		return <LoadSymbol<getDataParams,renderable[][]> 
			params={{pageNum:this.props.pageNumber}}
			toRender={this.renderTable}
			getData={this.getData}
		/>
	}
}