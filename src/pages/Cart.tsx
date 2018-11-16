import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, getTotals, cartItem } from "../services/Cart";
import { Link } from "react-router-dom";
import LoadSymbol from "src/components/loadSymbol";
import { Table } from 'reactstrap';
// import { storeLocal } from "src/services/localStorage";

// storeLocal("cart",
// [{id: "1", name : "Black Lotus",price: "", priceNum : 3000000.00, count : 6, priceTotal : "", priceTotalNum : 0},
// {id: "2",name : "Blaze", price: "", priceNum : 4.00, count : 1, priceTotal : "", priceTotalNum : 0},
// {id: "3",name : "Thran Turbine", price: "", priceNum : 300, count : 3, priceTotal : "", priceTotalNum : 0},
// {id: "4",name : "Marrow-Gnawer", price: "", priceNum : 40, count : 99, priceTotal : "", priceTotalNum : 0}]
// )



export default class Cart extends BasicComponent{
    
    renderCart(cart :cartItem[]){
        if(!cart){
            return <></>
        }
        const totals = getTotals(cart)
        const body = cart.map((item : cartItem) => 
                <tr key = {item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.priceTotal}</td>
                </tr>
        )
        
        return (
            <Table>
                <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {body}
          <tr>
          <th/>
          <th/>
          <th>Total: {totals[0]}</th>
          <th>Total: € {totals[1]}</th>
          </tr>
        </tbody>
            </Table>
           )
    }
    
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
         const fetch = async () => await getCart(this.props.APIS.req) 
        //  const render = (c : cartItem)=>[this.makeLink(c),{key : "cartPrice", element: c.price},{key : "cartCount", element: c.quantity.toString()},{key : "cartPriceTotal", element: c.priceTotal}]
        //  const head = ["Name","Price", "Amount", "Total Price"]
        //  const totals = getTotals(fetch)
        //  const foot = [{key:"padString1",element:""},{key:"padString2",element:""}, "Total: " + `${totals[0]}`, "Total: € " + `${totals[1]}`]
        
         return <LoadSymbol<{},cartItem[]> 
         toRender={this.renderCart}
         params={{}}
         getData = {fetch}
     />

        //  return (
        //     <div>
        //     <DataTable<cartItem> 
        //         //APIS={this.props.APIS}
        //         fetch={combined}
        //         head={head}
        //         foot={}
        //         render={render}
        //     />
        //     <button>Pay now</button>
        //     </div>    
        // )
        
    
	}
}