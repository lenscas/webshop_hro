import { props } from "src/types/BasicProps";
import { match, Redirect } from "react-router";
import BasicPage from "src/types/basicComponent";
import * as React from "react";
import CardList from "src/components/ProductList";
import { searchName } from "src/services/search";

type ProductListProps = props &  {
	match :match<{
		pageNum?:string
		name:string
	}>
}
type ProductListState = {pageNum : string}
export default class SearchList extends BasicPage<ProductListProps,ProductListState> {
	constructor(propsy){
		super(propsy)
		this.setUrl = this.setUrl.bind(this)
		this.state={pageNum:this.props.match.params.pageNum || "1"}

	}
	setUrl(pageNum : string){
		this.easySetState({pageNum})
	}
	render(){
		if( (
			this.props.match.params.pageNum !== this.state.pageNum) || 
			this.props.match.params.pageNum === undefined && this.state.pageNum !== "1"
		){
			return <Redirect to={"/search/"+this.props.match.params.name+"/"+this.state.pageNum}/>
		}
		const fetch = searchName(this.props.match.params.name) //(num : number) =>getList(this.props.APIS.req,num)
		return <CardList
			req={this.props.APIS.req}	
			fetch={fetch}
			urlHandler={this.setUrl}
			pageNum={ Number(this.state.pageNum)}
		/>
	}
}