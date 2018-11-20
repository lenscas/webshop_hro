import { sepNum } from "../funcs/lambdas";
import { API } from "./basics";
import { readLocal, readLocalRaw } from "./localStorage";

export type cartItem = {
    id:string;
    name:string;
    price:string;
    priceNum:number;
    quantity:number;
    priceTotal:string;
    priceTotalNum:number;
}
export const getCart = async (api: API) => {  
    
    let cartList : cartItem[] | undefined = []
    console.log(readLocalRaw("token"))
    if (readLocalRaw("token") !== undefined) {
        cartList = await api.doRequest<cartItem[]>("api/shoppingcart/",(t : any)=>t)
    }
    else {
        cartList = readLocal<cartItem[]>("cart") || undefined
    }
    
    let i:any
  
    if(cartList !== undefined){
            for(i = cartList.length - 1;i>=0;i--) 
            {
                cartList[i].priceTotalNum = cartList[i].priceNum * cartList[i].quantity
                
                cartList[i].priceNum = cartList[i].priceNum/100

                cartList[i].priceTotalNum = cartList[i].priceTotalNum/100

                cartList[i].price = `${cartList[i].priceNum}`

                cartList[i].price = sepNum(cartList[i].price)

                cartList[i].price = "€ " + cartList[i].price

                cartList[i].priceTotal = `${cartList[i].priceTotalNum}`

                cartList[i].priceTotal = sepNum(cartList[i].priceTotal)

                cartList[i].priceTotal = "€ " + cartList[i].priceTotal
            }
        }
    return cartList || [];
};

export const getTotals = (cart: cartItem[]) =>{
    let totalItems:string
    let totalPrice:string
    totalItems = "0";
    totalPrice = "0";

    let i:any
    for(i = cart.length - 1;i>=0;i--) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].priceTotalNum;
    }
    totalItems = sepNum(totalItems.toString())
    totalPrice = sepNum(totalPrice.toString())

    return [totalItems, totalPrice];
};