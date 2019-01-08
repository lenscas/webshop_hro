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
const remainder: {[key: string] : scryRes } = {}

export const searchCommander = async (name:string):Promise<searchResult[]>=>{
	if(name.length <= 3){
		return []
	}
	const rawRes = await searchAdvanced("is:commander name:"+name)
	return commanderConvert(rawRes)
}

export const searchForDeck = (name : string)=>{
	if(name.length <= 3){
		return async (pageNR : number ) => []
	}
	return async (pageNR : number ) => productListConvert(await searchAdvanced("name:" + name))
}

export const searchName = (name : string)=>{
	if (name.startsWith("color:")){
		return searchColor(name.slice(6))
	}
	return async (pageNR : number ) => productListConvert(await searchAdvanced("name:" + name,pageNR))
}

export const searchColor = (color : string)=>{
	return async (pageNR: number ) => productListConvert(await searchAdvanced("color:" +color,pageNR))
}

export const searchAdvanced = async (params : string , pageNR : number = 1):Promise<scryRes>=>{
	if(params+pageNR in buffer){
		return buffer[params+pageNR]
	}
	
	const url = new URL(searchUrl)
	url.searchParams.append("order","cmc")
	url.searchParams.append("q",params)
	const scryFallPageNR = pageNR/8
	if(!((scryFallPageNR-1)%8 === 0)){
		url.searchParams.append("page",(scryFallPageNR + 1).toString())
	}
	else{
		url.searchParams.append("page",(scryFallPageNR).toString())
	}

	console.log(url)
	
	const res = await fetch(url.toString())
	const asJson = await res.json() as scryRes
	if(remainder[params+pageNR]){
		asJson.data.reverse().concat(remainder[params+pageNR].data.reverse()).reverse()
	}

	const maxPages = Math.floor((asJson.data.length /20))
	for(let i=0;i<=maxPages;i++){
		const copy =JSON.parse(JSON.stringify(asJson));
		const list = asJson.data.slice((i)*20,(i+1)*20)
		if(list.length !== 20){
			remainder[params+pageNR] = copy;
			remainder[params+pageNR].data = list;
		} else {
			buffer[params+(pageNR+i)] = copy
			buffer[params+(pageNR+i)].data = list
		}
	}

	if (buffer[params+pageNR] === undefined){
		buffer[params+pageNR] = remainder[params+pageNR]
	}
	console.log(buffer)
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
			image: imageUri.normal,
			stock : 0
		}
	})
}