import {API} from "./basics";

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