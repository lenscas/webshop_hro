import * as React from "react";
import BasicComponent from "../types/basicComponent";
import {props} from "../types/BasicProps";
import { getList, product } from "../services/productList";
import DataTable from "../components/DataTable";
type ListState = {

}

export default class List extends BasicComponent<props,ListState> {
	render(){
         const fetch = async (p :product[]) => await getList(p)
         const render = (p : product)=>[p.name,p.property]
         const head = ["Name","Property"]
        return (
            <DataTable<product> APIS={this.props.APIS} fetch={fetch} head={head} render={render}/>
        )
    
	}
}