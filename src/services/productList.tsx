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
        {id: "1", name : "Black Lotus",price: "", priceNum : 3000.00, count : 6, priceTotal : "", priceTotalNum : 0},
        {id: "2",name : "Blaze", price: "", priceNum : 0.04, count : 1, priceTotal : "", priceTotalNum : 0},
        {id: "3",name : "Thran Turbine", price: "", priceNum : 3.00, count : 3, priceTotal : "", priceTotalNum : 0},
        {id: "4",name : "Marrow-Gnawer", price: "", priceNum : 0.40, count : 99, priceTotal : "", priceTotalNum : 0}
    ] 
    let i:any
    for(i = cartList.length - 1;i>=0;i--) {
        cartList[i].price = `${cartList[i].priceNum} EUR`
        cartList[i].priceTotalNum = cartList[i].priceNum * cartList[i].count
        cartList[i].priceTotal = `${cartList[i].priceTotalNum} EUR`
    }
    return cartList;
};
