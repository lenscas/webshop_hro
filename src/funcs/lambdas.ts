export const add = function<T,E=T>(a : (...params : Array<unknown>)=>T , b : ( res : T)=>E) {
	return (...params : Array<unknown>)=>b(a(...params))
}
export const addAsync = function<T,E=T>(a : (...params : Array<unknown>)=> Promise<T>, b : (res : T)=>E){
	return async (...params : Array<unknown>)=>{
		const res = await a(...params);
		return b(res);
	}
}
export const nothing = function(){return }
export const retTrue = function(...params: Array<unknown>):true {return true}
export const createRouteWithParams = function(route :string){
	const lastChar = route[route.length -1];
	if(lastChar !=="/"){
		route = route + "/"
	}
	return function(param : string) : string{
		return route + param 
	}
}
