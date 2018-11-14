export const defaultTrue = function(toCheck? : boolean){
	if(toCheck !== undefined){
		return toCheck
	}
	return true
}