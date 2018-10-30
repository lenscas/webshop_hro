import * as React from "react";
import BasicComponent from "../types/basicComponent";
import {props} from "../types/BasicProps";
import { getList, product } from "../services/productList";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";
type ListState = {

}

export default class ProductList extends BasicComponent<props,ListState> {
    makeLink(p :product){
        return (
            <Link to={`/product/${p.id}`}>
                {p.name}
            </Link>
        )
    }
    render(){
         const fetch = async (num : number) => await getList(this.props.APIS.req,num)
         const render = (p : product)=>[this.makeLink(p),p.price]
         const head = ["Name","Price"]
        return (
            <DataTable<product> 
                APIS={this.props.APIS}
                fetch={fetch}
                head={head}
                render={render}
            />
        )
    
	}
}