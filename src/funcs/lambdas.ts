export const add = function<T,E=T>(a : (...params : Array<unknown>)=>T , b : ( res : T)=>E) {
	return (...params : Array<unknown>)=>b(a(...params))
}
export const addAsync = function<T,E=T>(a : (...params : Array<unknown>)=> Promise<T>, b : (res : T)=>E){
	return async (...params : Array<unknown>)=>{
		const res = await a(...params);
		return b(res);
	}
}
export const addDoubleAsync = function<T1,T2,T3>(a:(p:T3)=>Promise<T1>, b:(p:T3)=>Promise<T2>){
	return (p:T3)=>{
		return new Promise<{0:T1,1:T2}>((resolve,reject)=>{
			let doneFirst = false;
			const data : {
				0 : T1 | undefined,
				1 : T2 | undefined
			} = {0 : undefined,1 : undefined};
			const doNext = (place,value:T1|T2)=>{
				data[place] = value;
				console.log(doneFirst)
				if(doneFirst){
					resolve(data as {0:T1,1:T2})
				}
				doneFirst = true;
			}
			a(p).then(v=>doNext(0,v))
			b(p).then(v=>doNext(1,v)).catch(v=>console.error(v)); 
		})
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

export function sepNumNumber(num:number){
	return sepNum( (num/100).toString())
}
export function sepNum(num: string){
	let splitPrice:string[]
	splitPrice = num.split(".",2)
	if (splitPrice.length > 1){
		splitPrice[1] = "." + splitPrice[1]
		if (splitPrice[1].length < 3){
			splitPrice[1] += "0"
		}
		if (splitPrice[1].length > 3){
			splitPrice[1] = splitPrice[1].substr(0, 3)
		}
	}
	else{
		splitPrice.push("")
	}
	let extraNums = ""
    while (splitPrice[0].length > 3)
    {
        extraNums = " " + splitPrice[0].slice(splitPrice[0].length-3) + extraNums
        splitPrice[0] = splitPrice[0].slice(0,-3)
    }
    splitPrice[0] = splitPrice[0] + extraNums
    num = splitPrice[0] + splitPrice [1]
    return num
}