import {API} from "./basics";

export type product = {
    id:              string;
    lang:            string;
    oracle_id:       string;
    foil:            boolean;
    legalities:      null;
    loyalty:         null;
    mana_cost:       string;
    name:            string;
    nonfoil:         boolean;
    oracle_text:     string;
    power:           null;
    reserved:        string;
    toughness:       null;
    type_line:       string;
    price:           string;
    image_uris:      null;
    rarity:          string;
    set:             string;
    setName:         string;
    all_parts:       null;
    colors:          null;
    color_identity:  null;
    color_indicator: null;
}

export type cartItem = {
    id:string;
    name:string;
    price:string;
    priceNum:number;
    count:number;
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
    }
    else{
        splitPrice.push("")
    }

    let extraNums = ""
    while (splitPrice[0].length > 3)
    {
        extraNums += " " + splitPrice[0].slice(splitPrice[0].length-3)
        splitPrice[0] = splitPrice[0].slice(0,-3)
    }
    splitPrice[0] += extraNums
    num = splitPrice[0] + splitPrice [1]
        return num
}

export const getList = async (api: API,pageNum : number) => {
    const products = await api.doRequest<product[]>(`api/main/60/${ (pageNum * 60) + 1}`,(t : any)=>t)
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
export const getCart = () => {
    let cartList:cartItem[]; 
    cartList = [
        {id: "1", name : "Black Lotus",price: "", priceNum : 3000000.00, count : 6, priceTotal : "", priceTotalNum : 0},
        {id: "2",name : "Blaze", price: "", priceNum : 4.00, count : 1, priceTotal : "", priceTotalNum : 0},
        {id: "3",name : "Thran Turbine", price: "", priceNum : 300, count : 3, priceTotal : "", priceTotalNum : 0},
        {id: "4",name : "Marrow-Gnawer", price: "", priceNum : 40, count : 99, priceTotal : "", priceTotalNum : 0}
    ] 
    let i:any
  
    for(i = cartList.length - 1;i>=0;i--) {

        cartList[i].priceNum = cartList[i].priceNum/100

        cartList[i].price = `${cartList[i].priceNum}`

        cartList[i].price = `${cartList[i].priceNum}`  

        cartList[i].price = sepNum(cartList[i].price)

        cartList[i].price = "€ " + cartList[i].price
     
        cartList[i].priceTotalNum = cartList[i].priceNum * cartList[i].count

        cartList[i].priceTotal = `${cartList[i].priceTotalNum}`

        cartList[i].priceTotal = sepNum(cartList[i].priceTotal)

        cartList[i].priceTotal = "€ " + cartList[i].priceTotal

    }
    return cartList;
};

export const getTotals = () =>{
    let totalItems:number
    let totalPrice:number
    totalItems = 0;
    totalPrice = 0;

    let i:any
    for(i = getCart().length - 1;i>=0;i--) {
        totalItems += getCart()[i].count;
        totalPrice += getCart()[i].priceTotalNum;
    }
    totalItems = sepNum(totalItems.toString())
    totalPrice = sepNum(totalPrice.toString())

    return [totalItems, totalPrice];
};
