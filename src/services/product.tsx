import {API} from "./basics";

export type cardId = string

export type productList = {
    id:     string;
    name:   string;
    price:  number;
    image: string;
}
export interface IManaResponce {
	id:          number;
	strSymbol:   string;
	picturePath: null;
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
    mana:       IManaResponce[];
}

export const getList = async (api: API,pageNum : number) => {
    const products = await api.doRequest<productList[]>(`api/main/20/${pageNum}`,(t : any)=>t.data.cards)
    return products || [];
}
export const getCard = async (api: API, id: cardId) :Promise<product | undefined> =>  {
    const card = await api.doRequest<product>("api/main/"+id,(e:any)=>e)
    return card
}