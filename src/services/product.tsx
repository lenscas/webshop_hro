import {API} from "./basics";
import { readLocal } from "../services/localStorage";

export type cardId = string

export type productList = {
    id:     string;
    name:   string;
    price:  number;
    image: string;
}

export type product = {
    id:         string;
    name:       string;
    image:      string;
    flavorText: string;
    oracleText: string;
    loyalty:    null;
    power:      string;
    toughness:  string;
    price:      number;
    typeLine:   string;
}

export type cartItem = {
    id:string;
    name:string;
    price:string;
    priceNum:number;
    quantity:number;
    priceTotal:string;
    priceTotalNum:number;
}

function sepNum(num){
    let splitPrice:string[]
    splitPrice = num.split(".",2)
    if (splitPrice.length > 1){
        splitPrice[1] = "." + splitPrice[1]
        if (splitPrice[1].length < 3)
        {
            splitPrice[1] += "0"
        }
        if (splitPrice[1].length > 3)
        {
            splitPrice[1] = splitPrice[1].substr(0, 3)
        }
    }
    else{
        splitPrice.push("")
    }

    let extraNums = ""
    while (splitPrice[0].length > 3)
    {
        extraNums = " " + splitPrice[0].slice(splitPrice[0].length-3) + extraNums
        splitPrice[0] = splitPrice[0].slice(0,-3)
    }
    splitPrice[0] = splitPrice[0] + extraNums
    num = splitPrice[0] + splitPrice [1]
        return num
}


export const getList = async (api: API,pageNum : number) => {
    const products = await api.doRequest<productList[]>(`api/main/20/${ (pageNum * 20) + 1}`,(t : any)=>t)
    return products || [];
    /*
    let productList:product[]; 
    productList = [
        {name : "Black Lotus", price : "3000.00 EUR"},
        {name : "Blaze", price : "0.04 EUR"},
        {name : "Thran Turbine", price : "3.00 EUR"},
        {name : "Marrow-Gnawer", price : "0.40 EUR"}
    ] 
    return productList;
    */
}
export const getCard = async (api: API, id: cardId) :Promise<product | undefined> =>  {
    const card = await api.doRequest<product>("api/main/"+id,(e:any)=>e)
    return card
}

export const getCart = async (api: API) => {  
    
    const cartList = readLocal<cartItem[]>("cart") || undefined
    //cartList = await api.doRequest<cartItem[]>("api/shoppingcart/",(t : any)=>t)
    
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
    let totalItems:number
    let totalPrice:number
    totalItems = 0;
    totalPrice = 0;

    let i:any
    for(i = cart.length - 1;i>=0;i--) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].priceTotalNum;
    }
    totalItems = sepNum(totalItems.toString())
    totalPrice = sepNum(totalPrice.toString())

    return [totalItems, totalPrice];
};