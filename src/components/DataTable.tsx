import * as React from "react";
import BasicComponent from "../types/basicComponent";
import {props} from "../types/BasicProps";
import Table from "reactstrap/lib/Table";

type TableState = {
	lines : string[][]
}
type TableProps<T> = {
	fetch : (pageNR : number) => Promise<T[]>
	render : (line : T)=>string[]
	head : string[]
} & props;

export default class DataTable<T> extends BasicComponent<TableProps<T>,TableState> {
	constructor(propsy : TableProps<T>){
		super(propsy)
		this.state = {lines:[]}
	}
	async componentDidMount(){
		const linesRaw = await this.props.fetch(1)
		const lines = linesRaw.map(line=>this.props.render(line))
		this.easySetState({lines})
	}
	renderHead(){
		return this.props.head.map(val=><th key={val}>{val}</th>)
	}
	renderBody(){
		return this.state.lines.map( (v,k)=><tr key={k}>{this.renderLine(v)}</tr>)
	}
	renderLine(line : string[]){
		return (
			line.map(val=><td key={val}>{val}</td>)
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