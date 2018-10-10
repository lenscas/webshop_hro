//import {API, APIReturn} from "./basics";

export type product = {
    name : string;
    property : string
}

export const getList = async (p :product[]) => {
    let productList:product[]; 
    productList = [
        {name : "Black Lotus", property : "3000.00 EUR"},
        {name : "Blaze", property : "0.04 EUR"},
        {name : "Thran Turbine", property : "3.00 EUR"},
        {name : "Marrow-Gnawer", property : "0.40 EUR"}
    ] 
    return productList;
}