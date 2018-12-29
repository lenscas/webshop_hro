import { API, APIReturn, BaseAPIReturn } from "./basics";
import { readLocal, readLocalRaw, RemoveLocalAll } from "./localStorage";
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
	user : {userId:string, shoppingCartId : number, role: string}
	token : string
	refreshToken:string
	id : string
}
export type credentials = {
	email: string,
	password: string
}

type shoppingCartItem = {
	shoppingcardId: number,
	PrintId: string
	quantity: number
}

const dealWithToken = (api:API,token? : afterLogin) => {
	if(token){
		if(api.onAll){
			const asBase : BaseAPIReturn = {refreshToken:token.refreshToken, userId:token.user.userId, cartId:token.user.shoppingCartId, role: token.user.role}
			api.onAll(asBase)
		}
		api.setToken(token.token, token.refreshToken)


		const items = readLocal<cartItem[]>("cart");
		const products: shoppingCartItem[] = [];
		if(items !== undefined) {
			items.forEach(element => {
				const shoppingCartId = Number(readLocalRaw("shoppingCartId"));
				if(shoppingCartId !== undefined) {
					products.push({
						shoppingcardId: shoppingCartId,
						PrintId : element.id,
						quantity : element.quantity
					})
				}
				
			});
			UpdateShoppingCart(api, products)
		}

		return true
	}
	return false
}

const UpdateShoppingCart = (api: API, items: shoppingCartItem[]) => {
	api.buildRequest("path", "api/shoppingCart/range")
		.buildRequest("method", "POST")
		.buildRequest("body", items)
		.buildRequest("converter", (t: APIReturn<cartItem[]>) => (getShoppingCartFromServer(api)))
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
	RemoveLocalAll()
	await (
		api.buildRequest("path","auth/logout")
		.buildRequest("method","POST")
		.buildRequest("body", JSON.stringify({"refreshToken":api.refreshToken}))
	).run()
}