import {API, APIReturn} from "./basics";

export type product = {
    name : string;
    price : string
}

export const getList = async (api: API) => {
    const products = await api.doRequest<product[]>("/main/20/1")
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