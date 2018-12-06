import { API, APIReturn, BaseAPIReturn } from "./basics";
import { fourOfAKind } from "src/pages/ProductList";

export type RegisterUser = {
	username: string
	email: string
	password:string
	repeatPassword: string
	approach: string
}

export type Address = {
	street: string
	number: number
	city: string
	zipCode: string
}

export type fourAddresses = fourOfAKind<Address>

export type UserData = {
	id: string
	name: string
	email: string
	role:string
	approach: string
	addresses: Address[]
	
}

type registerRes = {
	success : boolean,
	message : string
}
export type afterLogin ={
	user : {userId:string, shoppingCartId : number}
	token : string
	id : string
}
export type credentials = {
	email : string,
	password : string
}
const dealWithToken = (api:API,token? : afterLogin) => {
	if(token){
		if(api.onAll){
			const asBase : BaseAPIReturn = {userId:token.user.userId, cartId:token.user.shoppingCartId}
			api.onAll(asBase)
		}
		api.setToken(token.token)
		return true
	}
	return false
}
export const register = async (user : RegisterUser, api : API) => {
	const res = await (
		api.buildRequest("path","auth/register")
		.buildRequest("method", "POST")
		.buildRequest("body",user)
		.buildRequest("converter",(t:APIReturn<string>)=>({success: t.success, message: t.data}))
	).run<registerRes>()
	if(res === undefined){
		return res
	}
	if(res.success){
		return login({email: user.email,password: user.password}, api)
	} else {
		return {success : false, message:res.message}
	}
}
export const login = async (creds : credentials, api: API) : Promise<boolean> => {
	return dealWithToken(api,await (
		api.buildRequest("path","auth/login")
		.buildRequest("method","POST")
		.buildRequest("body",creds)
		.buildRequest("converter",(t:APIReturn<afterLogin>)=>t.data)
	).run<afterLogin>())
}

export const getUserData = async (api: API) => {
	
	const user = await api.doRequest<Partial<UserData>>("api/user/", (t: any) => t.data)

	const addresses : Array<Partial<UserData>> | undefined = await api.doRequest<Array<Partial<UserData>>>("api/address/", (t: any) => t.data)

	if (user !== undefined && addresses !== undefined){

		const userData = 
		{ id : user.id, name : user.name, email : user.email, role : user.role, approach : user.approach,
		addresses }
		return userData as UserData
	}
	else{
		return undefined
	}
};