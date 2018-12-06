import {searchUrl} from "../config"
import { productList } from "./product";

export type searchResult = {
	name : string
	id : string
}

type imageUris = {
	normal : string
}
type scryRes = {
	data : Array<{
		id : string
		name : string
		eur:number
		image_uris? : imageUris
		card_faces? : {
			[0] : {
				image_uris: imageUris
			}
		}
	}>
}
const buffer: {[key: string] : scryRes } = {}
export const searchCommander = async (name:string):Promise<searchResult[]>=>{
	if(name.length <= 3){
		return []
	}
	const rawRes = await searchAdvanced("is:commander name:"+name)
	return commanderConvert(rawRes)
}

export const searchName = (name : string)=>{
	return async (pageNR : number ) => productListConvert(await searchAdvanced("name:" + name,pageNR))
}
export const searchAdvanced = async (params : string, pageNR : number = 1):Promise<scryRes>=>{
	if(params+pageNR in buffer){
		return buffer[params+pageNR]
	}
	
	const url = new URL(searchUrl)
	url.searchParams.append("order","cmc")
	url.searchParams.append("q",params)
	url.searchParams.append("page",pageNR.toString())
	const res = await fetch(url.toString())
	const asJson = await res.json() as scryRes
	buffer[params+pageNR] = asJson// asJson.data.map(v=>({id:v.id,name:v.name}))
	return buffer[params+pageNR]//.filter((v,k)=>k<=10) || []
}
const commanderConvert = (rawRes : scryRes)=>{
	return rawRes.data.map(v=>({id:v.id,name:v.name}))
}
const productListConvert = (rawRes : scryRes):productList[]=>{
	return rawRes.data.map(v=>{
		let imageUri = v.image_uris
		if(!imageUri && v.card_faces){
			imageUri = v.card_faces[0].image_uris
		}
		imageUri = imageUri as imageUris
		return {
			id:v.id,
			name:v.name,
			price:v.eur*100,
			image: imageUri.normal
		}
	})
}