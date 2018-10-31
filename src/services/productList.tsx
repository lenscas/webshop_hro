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

export const getList = async (api: API,pageNum : number) => {
    const products = await api.doRequest<product[]>(`api/main/20/${ (pageNum * 20) + 1}`,(t : any)=>t)
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