import { API } from "./basics";

export const setStock = (api:API,id:string, amount:number)=>{
	api.doRequest("api/admin/stock/cards/"+id+"/"+amount)
}