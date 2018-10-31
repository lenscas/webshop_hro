import * as React from "react";
import BasicComponent from "../types/basicComponent";
import {props} from "../types/BasicProps";
import Table from "reactstrap/lib/Table";
export type product = {
    name : string;
    property : string
}

type TableState = {
	lines : Array<Array<string | JSX.Element>>
	pageNum : number
}
type TableProps<T> = {
	fetch : (pageNR : number) => Promise<T[]>
	render : (line : T)=>Array<string | JSX.Element>
	head : string[]
} & props;

export default class DataTable<T> extends BasicComponent<TableProps<T>,TableState> {
	constructor(propsy : TableProps<T>){
		super(propsy)
		this.state = {pageNum:1,lines:[]}
	}
	async componentDidMount(){
		const linesRaw = await this.props.fetch(this.state.pageNum)
		const lines = linesRaw.map(line=>this.props.render(line))
		this.easySetState({lines})
	}
	renderHead(){
		return this.props.head.map(val=><th key={val}>{val}</th>)
	}
	renderBody(){
		return this.state.lines.map( (v,k)=><tr key={k}>{this.renderLine(v)}</tr>)
	}
	renderLine(line : Array<string | JSX.Element>){
		return (
			line.map(val=><td key={val.toString()}>{val}</td>)
		)
	}
	render(){
		return (
			<Table striped={true} hover={true} responsive={true}>
				<thead>
					<tr>
						{this.renderHead()}
					</tr>
				</thead>
				<tbody>
					{this.renderBody()}
				</tbody>
			</Table>
		)
	}
}