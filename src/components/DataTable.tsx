import * as React from "react";
import Table from "reactstrap/lib/Table";
import LoadSymbol from "./loadSymbol";
import { defaultTrue } from "src/funcs/easyDefaults";
import BasicComponent from "src/types/smallComponent";
export type renderable = {
	key : string | number
	element : string | JSX.Element
}
type TableState = {
	pageNum : number
}
type TableProps<T> = {
	fetch : (pageNR : number) => Promise<T[]>
	render : (line : T)=>renderable[]
	head? : string[]
	striped? : boolean
	hover?: boolean
}
export type getDataParams = {
	pageNum : number
}

export default class DataTable<T> extends BasicComponent<TableProps<T>,TableState> {
	constructor(propsy : TableProps<T>){
		super(propsy)
		this.state = {pageNum:1}
		this.renderTable = this.renderTable.bind(this)
		this.getData = this.getData.bind(this)
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
	renderBody(lines){
		return lines.map( (v,k)=><tr key={k}>{this.renderLine(v)}</tr>)
	}
	renderLine(line : renderable[]){
		return (
			line.map(val=><td key={val.key}>{val.element}</td>)
		)
	}
	hover(){
		return defaultTrue(this.props.hover)
	}
	striped(){
		return defaultTrue(this.props.striped)
	}
	renderTable(lines : renderable[][]){
		return (
			<Table striped={this.striped()} hover={this.hover()} responsive={true}>
				<thead>
					<tr>
						{this.renderHead()}
					</tr>
				</thead>
				<tbody>
					{this.renderBody(lines)}
				</tbody>
			</Table>
		)
	}
	render(){
		return <LoadSymbol<getDataParams,renderable[][]> 
			params={{pageNum:1}}
			toRender={this.renderTable}
			getData={this.getData}
		/>
	}
}