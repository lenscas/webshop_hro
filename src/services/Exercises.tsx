import {API, APIReturn} from "./basics";

export type exercise = {
	datum : Date
	body : string
	category : string
	title: string
}
export type ExerciseReturn = {
	datum : number
	body : string
	category : string
	title: string
}
const mapDataToExercise = (json : ExerciseReturn) : exercise =>  {
	return {
		datum : new Date(json.datum * 1000),
		body : json.body,
		category: json.category,
		title : json.title || ""
	}
}
/*
const mapJsonToExercise = (json : APIReturn<exercise>) => {
	return mapDataToExercise(json.data)
}
*/

export const getList = async (pageNR : number, api : API) : Promise<exercise[]> => {
	type rawExerList = {list:ExerciseReturn[]}
	type rawReturn = APIReturn<rawExerList>
	type listReturn = {list:exercise[]}
	const converter = (json : rawReturn) : listReturn=>({list:json.data.list.map(v=>mapDataToExercise(v))})
	const res = await api.doRequest<rawExerList,listReturn>("exercises/list/"+pageNR,converter)
	if(!res){
		return []
	}
	return res.list
}