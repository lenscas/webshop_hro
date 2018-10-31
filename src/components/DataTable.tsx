import * as React from "react";
import BasicComponent from "../types/basicComponent";
import {props} from "../types/BasicProps";
import Table from "reactstrap/lib/Table";
export type product = {
    name : string;
    property : string
}
export type renderable = {
	key : string | number
	element : string | JSX.Element
}
type TableState = {
	lines : renderable[][]
	pageNum : number
}
type TableProps<rawT, T=rawT> = {
	fetch : (pageNR : number) => Promise<rawT[]>
	converter?: (res : rawT[]) => T[]
	render : (line : T)=>renderable[]
	head? : string[]
} & props;

export default class DataTable<rawT,T=rawT> extends BasicComponent<TableProps<rawT,T>,TableState> {
	constructor(propsy : TableProps<T>){
		super(propsy)
		this.state = {pageNum:1,lines:[]}
	}
	conv(rawRes : rawT[]): T[]{
		if(this.props.converter){
			return this.props.converter(rawRes)
		}
		return rawRes as any[]
	}
	async componentDidMount(){
		const linesRaw = await this.props.fetch(this.state.pageNum)
		const linesRes = this.conv(linesRaw)

		const lines = linesRes.map(
			line=>this.props.render(line)
		)
		this.easySetState({lines})
	}
	renderHead(){
		if(this.props.head){
			return this.props.head.map(val=><th key={val}>{val}</th>)
		}
		return <></>

	}
	renderBody(){
		return this.state.lines.map( (v,k)=><tr key={k}>{this.renderLine(v)}</tr>)
	}
	renderLine(line : renderable[]){
		return (
			line.map(val=><td key={val.key}>{val.element}</td>)
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