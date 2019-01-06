import { API, APIReturn, BaseAPIReturn } from "./basics";
import { readLocal, readLocalRaw, removeLocalAll } from "./localStorage";
import { cartItem, getShoppingCartFromServer } from "./Cart";

export type RegisterUser = {
	username: string
	email: string
	password: string
	repeatPassword: string
	approach: string
}

export type Address = {
	street: string
	number: number
	city: string
	zipCode: string
	id: number
}

export type UserData = {
	id: number
	name: string
	email: string
	role:string
	approach: string
	addresses: Address[]
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
	removeLocalAll()
	await (
		api.buildRequest("path","auth/logout")
		.buildRequest("method","POST")
		.buildRequest("body", JSON.stringify({"refreshToken":api.refreshToken}))
	).run()
}

export const updateUser = async (user : RegisterUser, api: API) => {
	const res = await (
		api.buildRequest("path","api/user")
		.buildRequest("method", "PUT")
		.buildRequest("body",user)
		.buildRequest("converter",(t:APIReturn<string>)=>({success: t.success, message: t.data}))
	).run<registerRes>()
	if(res === undefined){
		return res
	}
	if(res.success){
		return true//login({email: user.email,password: user.password}, api)
	} else {
		return {success : false, message:res.message}
	}
}

export const getUserData = async (api: API) => {
	
	const user = await api.doRequest<Partial<UserData>>("api/user/", (t: any) => t.data)

	// const user = {id: 1,
	// 	name: "Bruijn",
	// 	email: "beerbruijn@grizzly.nl",
	// 	role:"user",
	// 	approach: "Beer"

	// }

	const addresses : Address[] | undefined = await api.doRequest<Address[]>("api/address/", (t: any) => t.data)

	// const addresses : Address[] | undefined = [
	// 		{
	// 			street: "Honingplein",
	// 			number: 255,
	// 			city: "Lekkerdam",
	// 			zipCode: "1999OR",
	// 			id: 1
	// 		},
	// 		{
	// 			street: "Bimbamblv",
	// 			number: 3453,
	// 			city: "Gabberen",
	// 			zipCode: "4574HW",
	// 			id: 2
	// 		},
	// 		{
	// 			street: "Bazelweg",
	// 			number: 4,
	// 			city: "Appeldrecht",
	// 			zipCode: "3930AH",
	// 			id: 3
	// 		},
	// 		{
	// 			street: "Juiststraat",
	// 			number: 1,
	// 			city: "Enige a/d IJssel",
	// 			zipCode: "4321AB",
	// 			id: 4
	// 		},
	// 		{
	// 			street: "Honingplein",
	// 			number: 255,
	// 			city: "Lekkerdam",
	// 			zipCode: "1999OR",
	// 			id: 5
	// 		},
	// 		{
	// 			street: "Honingplein",
	// 			number: 255,
	// 			city: "Lekkerdam",
	// 			zipCode: "1999OR",
	// 			id: 6
	// 		},
	// 		{
	// 			street: "Honingplein",
	// 			number: 255,
	// 			city: "Lekkerdam",
	// 			zipCode: "1999OR",
	// 			id: 7
	// 		}
	//  	]
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
