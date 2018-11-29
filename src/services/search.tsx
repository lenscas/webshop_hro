import {searchUrl} from "../config"

export type searchResult = {
	name : string
	id : string
}

type scryRes = {
	data : Array<{
		id : string
		name : string
	}>
}

const buffer: {[key: string] : searchResult[] } = {}
export const searchCommander = (name:string)=>{
	return searchAdvanced("is:commander name:"+name)
}
export const searchAdvanced = async (params : string)=>{
	if(params in buffer){
		return buffer[params]
	}
	if(params.length <= 10){
		return []
	}
	const url = new URL(searchUrl)
	url.searchParams.append("order","cmc")
	url.searchParams.append("q",params)
	const res = await fetch(url.toString())
	const asJson = await res.json() as scryRes
	buffer[params] = asJson.data.map(v=>({id:v.id,name:v.name}))
	return buffer[params]//.filter((v,k)=>k<=10) || []
}