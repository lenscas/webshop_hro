import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, cartItem } from "../services/productList";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";

export default class Cart extends BasicComponent{
    makeLink(p :cartItem){
        return (
            <Link to={`/product/${p.id}`}>
                {p.name}
            </Link>
        )
    }
    render(){
         const fetch = async (num : number) => await getCart(/*this.props.APIS.req,num*/)
         const render = (c : cartItem)=>[this.makeLink(c),c.price, c.count.toString(), c.priceTotal]
         const head = ["Name","Price", "Amount", "Total Price"]
        return (
            <div>
            <DataTable<cartItem> 
                APIS={this.props.APIS}
                fetch={fetch}
                head={head}
                render={render}
            />
            <button>Pay now</button>
            </div>    
        )
        
    
	}
}