// import * as React from "react";
import BasicComponent from "src/types/smallComponent";
import { readLocal, storeLocal, readLocalRaw } from "src/services/localStorage";
import { cartItem } from "src/services/Cart";
import { API, APIReturn } from "src/services/basics";
// import { afterLogin } from "src/services/users";

export class AddToCartBtn extends BasicComponent<{},{}>{

}


export async function quantMod(cartThing : cartItem, modifier: number, api: API, update? : (params : {})=>Promise<void>) {
    
    let cart : cartItem[] | undefined = []
    if (readLocalRaw("token") !== undefined) {
        cart = await api.doRequest<cartItem[]>("api/shoppingcart/",(t : any)=>t)
    }
    else {
        cart = readLocal<cartItem[]>("cart") || undefined
    }
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

    if (readLocalRaw("token") !== undefined && changed !== undefined){
        
        api.buildRequest("path","api/shoppingcart")
        .buildRequest("method","POST")
        .buildRequest("body",{shoppingcartId : 53, printId : cartThing.id, quantity : changed.quantity})
        .buildRequest("converter",(t:APIReturn<{data: string, success: boolean}>)=>console.log(t.data)).run()
        //<cartItem[]>("api/shoppingcart/",(t : any)=>t)
    }

    if (cart !== undefined){
       
            storeLocal("cart", cart)
    }
    if (update !== undefined){
    update({})
    }
        
}