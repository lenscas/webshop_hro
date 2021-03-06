import { sepNum } from "../funcs/lambdas";
import { API } from "./basics";
import { readLocal, readLocalRaw, storeLocal } from "./localStorage";

export type cartItem = {
    id: string;
    name: string;
    price: string;
    priceNum: number;
    quantity: number;
    priceTotal: string;
    priceTotalNum: number;
}

export const getShoppingCartFromServer = async (api: API) => {
    if (readLocalRaw("token") !== undefined) {
        const cart: cartItem[] | undefined = await api.doRequest<cartItem[]>("api/shoppingcart/", (t: any) => t)
        if (cart !== undefined) {
            storeLocal("cart", cart);
        }

    }
}

export const getCart = async (api: API) => {

    let cartList: cartItem[] | undefined = []
    await getShoppingCartFromServer(api)
    cartList = readLocal<cartItem[]>("cart") || undefined

    let i: number

    if (cartList !== undefined) {
        for (i = cartList.length - 1; i >= 0; i--) {
            cartList[i].priceTotalNum = cartList[i].priceNum * cartList[i].quantity

            cartList[i].priceNum = cartList[i].priceNum / 100

            cartList[i].priceTotalNum = cartList[i].priceTotalNum / 100

            cartList[i].price = `${cartList[i].priceNum}`

            cartList[i].price = sepNum(cartList[i].price)

            cartList[i].price = "€ " + cartList[i].price

            cartList[i].priceTotal = `${cartList[i].priceTotalNum}`

            cartList[i].priceTotal = sepNum(cartList[i].priceTotal)

            cartList[i].priceTotal = "€ " + cartList[i].priceTotal
        }
    }
    return cartList || [];
};

export const getTotals = (cart: cartItem[]) => {
    let totalItems: number
    let totalPrice: number
    totalItems = 0;
    totalPrice = 0;
    let totalItemsStr: string
    let totalPriceStr: string

    let i: any
    for (i = cart.length - 1; i >= 0; i--) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].priceTotalNum;
    }
    totalItemsStr = sepNum(totalItems.toString())
    totalPriceStr = sepNum(totalPrice.toString())

    return [totalItemsStr, totalPriceStr];
};