import { API, APIReturn, BaseAPIReturn } from "./basics";
import { readLocal, readLocalRaw } from "./localStorage";
import { cartItem, getShoppingCartFromServer } from "./Cart";

export type RegisterUser = {
	username: string
	email: string
	password: string
	repeatPassword: string
	approach: string
}
type registerRes = {
	success: boolean,
	message: string
}
export type afterLogin ={
	user : {userId:string, shoppingCartId : number}
	token : string
	refreshToken:string
	id : string
}
export type credentials = {
	email: string,
	password: string
}
const dealWithToken = (api:API,token? : afterLogin) => {
	if(token){
		if(api.onAll){
			const asBase : BaseAPIReturn = {refreshToken:token.refreshToken, userId:token.user.userId, cartId:token.user.shoppingCartId}
			api.onAll(asBase)
		}
		api.setToken(token.token)


		const items = readLocal<cartItem[]>("cart");
		console.log(readLocalRaw("token"));
		if (items !== undefined && items.length > 0) {
			UpdateShoppingCart(api, items)
		}


		return true
	}
	return false
}

const UpdateShoppingCart = (api: API, items: cartItem[]) => {
	api.buildRequest("path", "api/shoppingCart/range")
		.buildRequest("method", "POST")
		.buildRequest("body", items)
		.buildRequest("converter", (t: APIReturn<cartItem[]>) => (console.log("success"), getShoppingCartFromServer(api)))
		.run()
}

export const register = async (user: RegisterUser, api: API) => {
	const res = await (
		api.buildRequest("path", "auth/register")
			.buildRequest("method", "POST")
			.buildRequest("body", user)
			.buildRequest("converter", (t: APIReturn<string>) => ({ success: t.success, message: t.data }))
	).run<registerRes>()
	if (res === undefined) {
		return res
	}
	if(res.success){
		return true//login({email: user.email,password: user.password}, api)
	} else {
		return { success: false, message: res.message }
	}
}
export const login = async (creds: credentials, api: API): Promise<boolean> => {
	return dealWithToken(api, await (
		api.buildRequest("path", "auth/login")
			.buildRequest("method", "POST")
			.buildRequest("body", creds)
			.buildRequest("converter", (t: APIReturn<afterLogin>) => t.data)
	).run<afterLogin>())
}
export const logOut = async (api: API) : Promise<void> => {
	await (
		api.buildRequest("path","auth/logout")
		.buildRequest("method","POST")
		.buildRequest("body", JSON.stringify({"refreshToken":api.refreshToken}))
	).run()
}