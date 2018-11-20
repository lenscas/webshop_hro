import {apiUrl} from "../config";
export type BaseAPIReturn = {
	cartId? : number
	userId? : string
	success? : boolean
}

export type APIReturn<T> = BaseAPIReturn & {
	data : T
}
type APIError = BaseAPIReturn & {
	data : any
}
export class API {
	public setToken : (token : string)=>void
	public onAll? : (data : BaseAPIReturn)=>void
	private path?   : string
	private config? : any
	private token? : string
	private converter : any
	constructor(setToken : (token : string)=>void, token?:string){
		this.resetBuilder();
		this.setToken = setToken
		this.token = token
	}
	public setOnError( errorHandler : (error : APIError)=>void){
		this.onError = errorHandler;
	}
	public setOnAll( hook : (data : BaseAPIReturn)=>void){
		this.onAll = hook;
	}
	public buildRequest(name: string, value: any){
		if(name==="path"){
			this.path=value
		} else if(name === "converter"){
			this.converter = value
		} else {
			if(name === "body" && typeof value === "object"){
				value = JSON.stringify(value)
			}
			this.config[name] = value
		}
		return this;
	}
	public async run<T>(){
		if(this.path && this.converter){
			const res = await this.doRequest<T>(this.path,this.converter,this.config)
			this.resetBuilder()
			return res;

		}
		throw new Error("missing parameters")
	}
	public async doRequest<T,T2 =T >(path:string,converter? : (json:APIReturn<T>)=>T2,config?:object) : Promise<T2|undefined>{
		const baseIndex = await this.baseReq<T>(path,config);
		/*if(this.onAll){
			this.onAll(baseIndex);
		}*/
		if(converter){
			const converted = await this.convert<T,T2>(baseIndex,converter);
			if(converted===null){
				console.error(baseIndex)
				this.onError(baseIndex);
				return
			} else {
				return converted;
			}
		}
		return
	}
	private onError = (error : APIError):void => {throw new Error(error.data.message)}

	private resetBuilder(){
		this.path = ""
		this.config = {}
		this.converter = ()=>undefined
	}

	private async baseReq<T>(path: string, config? : any): Promise<APIReturn<T>> {
		if(!config || typeof config !== "object"){
			config  = {}
		}
		if(!config.headers){
			config.headers = {}
		}
		config.mode = "cors"
		config.credentials = "include"
		config.headers["Content-Type"] = "application/json"
		if(this.token){
			config.headers.Authorization = "Bearer " + this.token
		}
		const res : Response = await fetch(apiUrl + path, config);
		// tslint:disable-next-line:no-debugger
		//debugger;
		const json = await res.json() as APIReturn<T>;
		//debugger;
		return json;
	}
	private convert<T,T2 = T>(json:APIReturn<T>, converter : (data : APIReturn<T>)=>T2){
		return converter(json)
	}
}

