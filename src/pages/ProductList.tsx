import BasicPage from "src/types/basicComponent";
import { match, Redirect } from "react-router";
import { props } from "src/types/BasicProps";
import CardList from "src/components/ProductList";
import { getList } from "src/services/product";
import * as React from "react";
import { readLocal, storeLocal } from "src/services/localStorage";
type ProductListProps = props &  {match? :match<{pageNum:string}>}
type ProductListState = {pageNum : string}
export default class ProductList extends BasicPage<ProductListProps,ProductListState> {
	constructor(propsy){
		super(propsy)
		this.setUrl = this.setUrl.bind(this)
		this.state={pageNum:(this.props.match !== undefined && this.props.match.params.pageNum) || "1"}
		if(readLocal("cart") === undefined) {
            storeLocal("cart", []);
        }
	}
	setUrl(pageNum : string){
		this.easySetState({pageNum})
	}
	render(){
		console.log("awesome?")
		if
			("match" in this.props && this.props.match !==undefined && 
			this.props.match.params.pageNum !== this.state.pageNum
		){
			return <Redirect to={"/products/"+this.state.pageNum}/>
		}
		if(this.props.match === undefined && this.state.pageNum !== "1"){
			return <Redirect to={"/products/"+this.state.pageNum}/>
		}
		const fetch = (num : number) =>getList(this.props.APIS.req,num)
		console.log("awesome?")
		return <CardList
			req={this.props.APIS.req}	
			fetch={fetch}
			urlHandler={this.setUrl}
			pageNum={ (this.props.match!==undefined && Number(this.props.match.params.pageNum)) ||1 }
		/>
	}
}