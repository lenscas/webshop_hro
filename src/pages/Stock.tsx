import BasicPage from "src/types/basicComponent";
import * as React from "react";
import DataTable from "src/components/DataTable";
import { getList, productList } from "src/services/product";
import { props } from "src/types/BasicProps";
import { setStock } from "src/services/stock";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
type StockState = {
	pageNumber:string,
	open: boolean
}
export default class Stock extends BasicPage<props,StockState> {
	constructor(propsy){
		super(propsy)
		this.state = {pageNumber:"1", open: false}
		this.getData = this.getData.bind(this)
		this.renderLines = this.renderLines.bind(this)
		this.pageNumHandler = this.pageNumHandler.bind(this)
	}

	toggle = () => {
		this.setState({
			open: !this.state.open
		})
	}

	getData(pageNR : number){
		return getList(this.props.APIS.req,pageNR)
	}
	createOnChange(card: productList, forceUpdate:()=>void ){
		return (a)=>{
			forceUpdate()
		}
	}
	renderLines(line: productList,forceUpdate:()=>void){
		const onSubmit =(ba)=>{
			ba.preventDefault()
			console.log(ba)
			const amount = new FormData(ba.target).get("amount")
			if(amount){
				setStock(this.props.APIS.req,line.id,Number(amount))
				this.toggle()
			}
			


		}
		return [
			{
				key:line.id,
				element: <label htmlFor={line.id+"input"}>{line.name}</label>
			},
			{
				key:line.id+"stock",
				element: 
				<form className="form-inline" onSubmit={onSubmit}>
					<input 
						type="number"
						className="form-control mb-2 mr-sm-2"
						id={line.id+"stock"}
						name="amount"
						required={true}
						defaultValue={line.stock.toString()}
					/>
					<button type="Success" className="btn btn-primary mb-2">Submit</button>
				</form>
			},
		]
	}
	pageNumHandler(pageNum :string){
		this.easySetState({pageNumber:pageNum})
	}
	render(){
		return <div>
			<h1 className="Ctitle">Product Stocks</h1>
			<DataTable
			fetch={this.getData}
			render={this.renderLines}
			pageNumber={Number(this.state.pageNumber)}
			setUrlHandler={this.pageNumHandler}
		/>
		<Modal isOpen={this.state.open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                <ModalBody>
                   Stock is updated
                </ModalBody>
            </Modal>
		</div>
	}
}