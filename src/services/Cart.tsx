import { sepNum } from "../funcs/lambdas";
import { API } from "./basics";

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
    
    const cartList = await api.doRequest<cartItem[]>("api/shoppingcard/",(t : any)=>t)
    //readLocal<cartItem[]>("cart") || []
    
    let i:any
  
    if(cartList !== undefined){
            for(i = cartList.length - 1;i>=0;i--) 
            {
                cartList[i].priceNum = cartList[i].priceNum/100

                cartList[i].price = `${cartList[i].priceNum}`

                cartList[i].price = `${cartList[i].priceNum}`  

                cartList[i].price = sepNum(cartList[i].price)

                cartList[i].price = "€ " + cartList[i].price
            
                cartList[i].priceTotalNum = cartList[i].priceNum * cartList[i].quantity

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