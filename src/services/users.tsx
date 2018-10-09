import { API } from "./basics";

export type RegisterUser = {
	username: string
	email: string
	password:string
	repeatPassword: string
	approach: string
}
export type credentials = {
	email : string,
	password : string
}
export const register = async (user : RegisterUser, api : API) : Promise<any> => {
	return await (
		api.buildRequest("path","auth/register")
		.buildRequest("method", "POST")
		.buildRequest("body",user)
	).run<any>()
}
export const login = async (creds : credentials, api: API) : Promise<boolean> => {
	return await (
		api.buildRequest("path","auth/login")
		.buildRequest("method","POST")
		.buildRequest("body",creds)
	).run<boolean>() || false
}