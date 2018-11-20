// import * as React from "react";
import BasicComponent from "src/types/smallComponent";
import { readLocal, storeLocal, readLocalRaw } from "src/services/localStorage";
import { cartItem } from "src/services/Cart";
import { API, APIReturn } from "src/services/basics";
// import { afterLogin } from "src/services/users";

export class AddToCartBtn extends BasicComponent<{}, {}>{

}


export async function quantMod(cartThing: cartItem, modifier: number, api: API, update?: (params: {}) => Promise<void>) {

    let cart: cartItem[] | undefined = []
    cart = readLocal<cartItem[]>("cart") || undefined


    let item: cartItem | undefined
    if (cart !== undefined) {
        item = cart.find(x => x.id === cartThing.id)
        if (item !== undefined) {
            item.quantity += modifier

        } else {
            item = { id: cartThing.id, name: cartThing.name, price: cartThing.price, priceNum: cartThing.priceNum, quantity: cartThing.quantity, priceTotal: cartThing.priceTotal, priceTotalNum: cartThing.priceTotalNum };
            await cart.push(item);
        }
        if (readLocalRaw("token")) {
            const shoppingCartId = readLocalRaw("shoppingCartId");
            await (api.buildRequest("path", "api/shoppingcart")
                .buildRequest("method", "POST")
                .buildRequest("body", { shoppingcardId: shoppingCartId, printId: cartThing.id, quantity: item.quantity })
                .buildRequest("converter", (t: APIReturn<{ data: string, success: boolean }>) => console.log(t.data.data))).run()
        }
        storeLocal("cart", cart)
    }
    if (update !== undefined) {
        update({})
    }

}