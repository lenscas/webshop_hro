import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getCart, getTotals, cartItem } from "../services/product";
import { Link } from "react-router-dom";
import LoadSymbol from "src/components/loadSymbol";
import { Table } from 'reactstrap';
import { quantMod } from "src/components/addToCart";
// import { storeLocal } from "src/services/localStorage";

// storeLocal("cart",
//  [
//      {id: "1", name : "Black Lotus",price: "", priceNum : 3000000.00, quantity : 6, priceTotal : "", priceTotalNum : 0},
//     {id: "2",name : "Blaze", price: "", priceNum : 4.00, quantity : 1, priceTotal : "", priceTotalNum : 0},
//     {id: "3",name : "Thran Turbine", price: "", priceNum : 300, quantity : 3, priceTotal : "", priceTotalNum : 0},
//     {id: "4",name : "Marrow-Gnawer", price: "", priceNum : 40, quantity : 99, priceTotal : "", priceTotalNum : 0}
// ]
//  )

export default class Cart extends BasicComponent<{ APIS},{modif: number}>{
    
    constructor(props) {
        super(props);
        this.modOnClick = this.modOnClick.bind(this)
        this.renderCart = this.renderCart.bind(this)
      }
    
    modOnClick(cartThing: cartItem, mod: number, update : (params : {})=>Promise<void>){
        return ()=>quantMod(cartThing, mod,update)
    }


    renderCart(cart :cartItem[],update:(params : {})=>Promise<void>){
         if(!cart){
            return <></>
        }
        const totals = getTotals(cart)
        const body = cart.map((item : cartItem) =>{
              
              return <tr key = {item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td key={item.quantity}>
                        <button onClick = {this.modOnClick(item, -1,update)}>-</button>

                        {item.quantity}
                        
                        <button onClick = {this.modOnClick(item, 1,update)}>+</button>
                    </td>
                    <td>{item.priceTotal}</td>
                </tr>
        }
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
         return <LoadSymbol<{},cartItem[]> 
         toRender={this.renderCart}
         params={{}}
         getData = {fetch}
     />
	}
}