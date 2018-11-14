import {props} from "./BasicProps";
import BasicComponent from "./smallComponent";

export default class BasicPage< Props1 extends props = props, State extends {} = {}> extends BasicComponent<Props1,State> {
	constructor(propsy : any){
		super(propsy);
	}
	componentWillUnmount(){
		this.props.APIS.clearAlerts()
	}
}