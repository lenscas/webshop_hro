import * as React from "react";
import BasicComponent from "src/types/smallComponent";
import "../style/onHover.css"

type OnHoverNearMouseProps = {
	alwaysShow : JSX.Element |  (()=>JSX.Element | string)
	onHover : ()=>JSX.Element | string
}

type OnHoverNearMouseState = {
	showItem : boolean
	xLocation : number
	yLocation : number
	windowHeight: number
	windowWidth : number
	elementSizeX : number
	elementSizeY : number
}

export default class OnHoverNearMouse extends BasicComponent<OnHoverNearMouseProps,OnHoverNearMouseState>{
	constructor(props){
		super(props)
		this.renderHover = this.renderHover.bind(this)
		this.onEnter = this.onEnter.bind(this)
		this.onLeave = this.onLeave.bind(this)
		this.setPosition = this.setPosition.bind(this)
		this.setRefPosition = this.setRefPosition.bind(this)
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
		this.renderAlwaysShow = this.renderAlwaysShow.bind(this)
		this.state = {showItem:false,xLocation:0,yLocation:0, windowHeight:0,windowWidth:0,elementSizeX:0,elementSizeY:0}
	}
	updateWindowDimensions() {
		this.easySetState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	setRefPosition(element : HTMLDivElement){
		if(!element){
			return
		}
		this.easySetState({elementSizeX:element.clientWidth,elementSizeY:element.clientHeight})
	}
	calculateFinalLocation(){
		const offset = this.state.windowWidth /100 *2;
		let positionX = this.state.xLocation + offset
		const furthestXAway =  positionX + this.state.elementSizeX

		if(furthestXAway + 5 >= this.state.windowWidth){
			positionX = this.state.xLocation - offset - this.state.elementSizeX
		}
		let positionY = (this.state.yLocation - this.state.elementSizeY /2)
		const furthestHighYAway = positionY + this.state.elementSizeY /2
		const furthestLowYAway = positionY - this.state.elementSizeY /2
		if(furthestHighYAway + 5 >=this.state.windowHeight){
			positionY = positionY - this.state.elementSizeY / 2
		} else if(furthestLowYAway -5 <= 0){
			positionY = positionY + this.state.elementSizeY /2
		}
		return {"left": positionX+"px", "top": +positionY+"px"};
	}
	renderHover(){
		if(!this.state.showItem){
			return <></>
		}
		const pos = this.calculateFinalLocation()
		return (
			<div className="onHoverNearMouse" ref={this.setRefPosition} style={pos}>
				{this.props.onHover()}
			</div>
		)
	}
	onEnter(event : React.MouseEvent<HTMLDivElement>){

		this.easySetState({showItem:true})
		this.setPosition(event)
	}
	onLeave(){
		this.easySetState({showItem:false})
	}
	setPosition(event :React.MouseEvent){
		this.easySetState({xLocation:event.clientX,yLocation:event.clientY})
	}
	renderAlwaysShow(){
		if(typeof this.props.alwaysShow === "function"){
			return this.props.alwaysShow()
		}
		return this.props.alwaysShow
	}
	render(){
		return (
			<div onMouseEnter={this.onEnter} onMouseMove={this.setPosition} onMouseLeave={this.onLeave}>
				{this.renderAlwaysShow()}
				{this.renderHover()}
			</div>
		)
	}
}