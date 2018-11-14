import * as React from "react";
import BasicComponent from "src/types/smallComponent";

type loadProps<ParamT,resT> = {
	toRender : (resT)=> JSX.Element
	params : ParamT
	getData : (params : ParamT)=>Promise<resT>
}
type loadState<resT> = {
	results? : resT,
	doneLoading : boolean
}

export default class LoadSymbol<ParamT,ResT> extends BasicComponent<loadProps<ParamT,ResT>,loadState<ResT>> {
	constructor(props){
		super(props)
		this.state = {doneLoading:false}
	}
	async getData(params : ParamT){
		this.easySetState({doneLoading: false},async ()=>{
			const res = await this.props.getData(params)
			this.easySetState({results:res,doneLoading:true},()=>console.log('its done'))
		})
	}
	checkEqual(oldProps : ParamT , newProps : ParamT){
		const oldKeys = Object.keys(oldProps)
		const same = oldKeys.every(key=>{
			if(key in newProps){
				return oldProps[key] === newProps[key]
			}
			return false
		})
		return same && oldKeys.length === Object.keys(newProps).length
	}
	componentDidUpdate(props : loadProps<ParamT,ResT>){
		if(!this.checkEqual(props.params,this.props.params)){
			this.getData(this.props.params)
		}
	}
	componentDidMount(){
		this.getData(this.props.params)
	}
	render(){
		if(!this.state.doneLoading){
			return <div id="laadDiv">
			<i className=" fas fa-spinner fa-spin fa-10x laden" />
			</div>
		}
		const res = this.props.toRender(this.state.results)
		return res

	}

}