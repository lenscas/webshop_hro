import { API, APIReturn } from "./basics";

export type RegisterUser = {
	username: string
	email: string
	password:string
	repeatPassword: string
	approach: string
}
export type afterLogin ={
	token : string
	id : string
}
export type credentials = {
	email : string,
	password : string
}
const dealWithToken = (api:API,token? : afterLogin) => {
	console.log(token)
	if(token){
		api.setToken(token.token)
		return true
	}
	return false
}
export const register = async (user : RegisterUser, api : API) : Promise<any> => {
	return dealWithToken(api,await (
		api.buildRequest("path","auth/register")
		.buildRequest("method", "POST")
		.buildRequest("body",user)
		.buildRequest("converter",(t:APIReturn<afterLogin>)=>t.data)
	).run<afterLogin>())
	
}
export const login = async (creds : credentials, api: API) : Promise<boolean> => {
	return dealWithToken(api,await (
		api.buildRequest("path","auth/login")
		.buildRequest("method","POST")
		.buildRequest("body",creds)
		.buildRequest("converter",(t:APIReturn<afterLogin>)=>t.data)
	).run<afterLogin>())
}