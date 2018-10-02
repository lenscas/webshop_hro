import { API } from "./basics";

export const Register = async (user : FormData, api : API) : Promise<boolean> => {
	const res = await (api.buildRequest("path","register").buildRequest("body", user).run<boolean>())
	return res || false
}