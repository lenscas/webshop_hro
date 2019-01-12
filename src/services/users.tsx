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
export type RegisterUserAsAdmin = {
	name: string
	email: string
	password: string
	repeatPassword: string
	approach: string
	role: string
}

export type Address = {
	street: string
	number: number
	city: string
	zipCode: string
	id: number
	main: boolean
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
		if(typeof token === 'string') {
			return false
		}
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
export const login = async (creds: credentials, api: API): Promise<boolean | registerRes> => {
	const res = await dealWithToken(api, await (
		api.buildRequest("path", "auth/login")
			.buildRequest("method", "POST")
			.buildRequest("body", creds)
			.buildRequest("converter", (t: APIReturn<afterLogin> | APIReturn<string>) => t.data)
	).run<afterLogin>())
	if (res) {
		return res
	} else {
		return {success : false, message: "Combination of email and password is not a known combination of email and password is not known in our system."}
	}
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

	const addresses : Address[] | undefined = await api.doRequest<Address[]>("api/address/", (t: any) => t.data)
	if (user !== undefined){

		let add: Address[]

		if(addresses === undefined) {
			add = []
		} else {
			add = addresses
		}

		const userData = 
		{ id : user.id, name : user.name, email : user.email, role : user.role, approach : user.approach,
			addresses : add }
		return userData as UserData
	}
	else{
		return undefined
	}
};

export const setDefaultAddress = async (api: API, address: Address) => {

	const res = await (
		api.buildRequest("path","api/address/default")
		.buildRequest("method", "PUT")
		.buildRequest("body",address)
		.buildRequest("converter",(t:APIReturn<boolean>)=>({success : t.success}))
	).run<{success: boolean}>()

	if(res) {
		return res.success
	}
	return false
}

export const deleteAddress = async (api: API, addressId: number, toggle: () => void, update?: (params: {}) => Promise<void>) => {
	const res = await (
		api.buildRequest("path",`api/address/${addressId}`)
		.buildRequest("method", "DELETE")
		.buildRequest("converter",(t:APIReturn<boolean>)=>({success : t.success}))
	).run<{success: boolean}>()

	if(res && res.success) {
		if(update) {
			update({})
		}
		toggle()
	}
}

export const updateAddress = async (api: API, address: Address, toggle: () => void, update?: (params: {}) => Promise<void>) => {
	const res = await (
		api.buildRequest("path",`api/address/${address.id}`)
		.buildRequest("method", "PUT")
		.buildRequest("body",address)
		.buildRequest("converter",(t:APIReturn<boolean>)=>({success : t.success}))
	).run<{success: boolean}>()

	if(res && res.success) {
		if(update) {
			update({})
		}
		toggle()
	}
}
