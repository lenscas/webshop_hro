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