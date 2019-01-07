import * as React from "react";
import Table from "reactstrap/lib/Table";
import LoadSymbol from "./loadSymbol";
import { defaultTrue } from "src/funcs/easyDefaults";
import BasicComponent from "src/types/smallComponent";
import PageButtons from "./pageButtons";

export type renderable = {
	key : string | number
	element : string | JSX.Element
}
type TableProps<T> = {
	fetch : (pageNR : number) => Promise<T[]>
	render : (line : T, forceUpdate:()=>void)=>renderable[]
	pageNumber: number
	setUrlHandler : (param: string)=>void
	head? : string[]
	foot? : Array<string| renderable>
	striped? : boolean
	hover?: boolean
	equalWidth? : boolean
	borderLess? : boolean

}
export type getDataParams = {
	pageNum : number
}
export type dataState<T> = {
	newPageNumber:number
}

export default class DataTable<T> extends BasicComponent<TableProps<T>,dataState<T>> {
	constructor(propsy : TableProps<T>){
		super(propsy)
		this.state = {newPageNumber:this.props.pageNumber}
		this.renderTable = this.renderTable.bind(this)
		this.getData = this.getData.bind(this)
		this.setPageNumberState = this.setPageNumberState.bind(this)
		this.processRender = this.processRender.bind(this)
	}
	getData(params : getDataParams){
		return this.props.fetch(params.pageNum)
	}
	processRender(data : T[],update:(data : getDataParams)=>Promise<void>){
		return this.renderTable(
			data.map((v)=>this.props.render(v,()=>update({pageNum:this.props.pageNumber})))
		)
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
		this.props.setUrlHandler(newPageNum.toString())
	}
	renderTable(lines : renderable[][]){
		const buttons =(
			<PageButtons
				setNewNumber={this.setPageNumberState}
				page={this.props.pageNumber}
			/>
		)
		return (
			<>
				{buttons}
				<Table striped={this.striped()} hover={this.hover()} borderless={this.props.borderLess !== undefined && this.props.borderLess} >
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
		return <LoadSymbol<getDataParams,T[]> 
			params={{pageNum:this.props.pageNumber}}
			toRender={this.processRender}
			getData={this.getData}
		/>
	}
}