import { API } from "./basics";

export type RegisterUser = {
	username: string
	email: string
	password:string
	repeatPassword: string
	approach: string
}

export const register = async (user : RegisterUser, api : API) : Promise<any> => {
	return await (
		api.buildRequest("path","auth/register")
		.buildRequest("method", "POST")
		.buildRequest("body",user)
	).run<any>()
}