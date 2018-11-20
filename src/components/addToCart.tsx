// import * as React from "react";
import BasicComponent from "src/types/smallComponent";
import { readLocal, storeLocal } from "src/services/localStorage";
import { cartItem } from "src/services/Cart";

export class AddToCartBtn extends BasicComponent<{},{}>{

}


export const quantMod = (cartThing : cartItem, modifier: number, update? : (params : {})=>Promise<void>) =>{
    const cart = readLocal<cartItem[]>("cart") 
    let changed : cartItem | undefined
    if (cart !== undefined){
        changed = cart.find(x => {return x.id === cartThing.id
    })  
    }
    if (changed !== undefined && changed.quantity + modifier > -1){
    changed.quantity += modifier
    }
    
    if(changed === undefined){
        const variabele: cartItem = {id: cartThing.id, name : cartThing.name,price: cartThing.price, priceNum : cartThing.priceNum, quantity : cartThing.quantity, priceTotal : cartThing.priceTotal, priceTotalNum : cartThing.priceTotalNum}
        if (cart !== undefined){
        cart.push(variabele)
        }
    }
    else if(changed.quantity < 1 && cart !== undefined){
        cart.splice(cart.findIndex(x => {return x.id === cartThing.id
        }), 1)
    }

    if (cart !== undefined){
    //api.buildRequest
    //<cartItem[]>("api/shoppingcart/",(t : any)=>t)
    storeLocal("cart", cart)
    }
    if (update !== undefined){
    update({})
    }
}