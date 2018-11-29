export const makeParams = (url: URL,obj : {[key:string]: string})=>
	Object.keys(obj).forEach(
		key => url.searchParams.append(key, obj[key])
	)
