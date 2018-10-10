//import {API, APIReturn} from "./basics";

export type product = {
    name : string;
    property : string
}

export const getList = async (p :product[]) => {
    let productList:product[]; 
    productList = [
        {name : "Black Lotus", property : "3000.00 EUR"},
        {name : "Banana", property : "0.04 EUR"},
        {name : "Aang", property : "3.00 EUR"},
        {name : "Katara", property : "0.40 EUR"}
    ] 
    return productList;
}