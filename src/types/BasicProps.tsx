import {API} from "../services/basics"
export type props = {
	APIS : {
		setHeader : (header:string)=>void;
		req : API;
		userId? : string;
		setUserId : (newUserId? : string)=>void;
		clearAlerts :()=>void;
	}

}