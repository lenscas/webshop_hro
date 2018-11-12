import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, getTotals, cartItem } from "../services/productList";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";

export default class Cart extends BasicComponent{
    makeLink(p :cartItem){
        return{
            key : "iets",
            element :  (
                <Link to={`/product/${p.id}`}>
                    {p.name}
                </Link>
            )
        }
    }
    render(){
         const fetch = async (num : number) => await getCart(/*this.props.APIS.req,num*/)
         const render = (c : cartItem)=>[this.makeLink(c),{key : "cartPrice", element: c.price},{key : "cartCount", element: c.count.toString()},{key : "cartPriceTotal", element: c.priceTotal}]
         const head = ["Name","Price", "Amount", "Total Price"]
         const totals = getTotals()
         const foot = [{key:"padString1",element:""},{key:"padString2",element:""}, "Total: " + `${totals[0]}`, "Total: " + `${totals[1]}` + " EUR"]
        return (
            <div>
            <DataTable<cartItem> 
                //APIS={this.props.APIS}
                fetch={fetch}
                head={head}
                foot={foot}
                render={render}
            />
            <button>Pay now</button>
            </div>    
        )
        
    
	}
}