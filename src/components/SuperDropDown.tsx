import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BasicComponent from 'src/types/smallComponent';
import { defaultTrue } from 'src/funcs/easyDefaults';

export type dropDownItems = {
	text : string
	onClick : ()=>void
	disabled?: boolean
	header?: boolean
	
} | {
	divider : true
}

type dropDownProps = {
	caret : boolean
	items : dropDownItems[]
	text: string
}

type dropdownState= {
	dropdownOpen : boolean
}

export default class SuperDropDown extends BasicComponent<dropDownProps,dropdownState> {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	renderDropDownItems(){
		return this.props.items.map(item=>{
			if("divider" in item){
				return <DropdownItem divider={true}/>
			} else {
				return <DropdownItem 
					header={defaultTrue(item.header)}
					disabled={defaultTrue(item.disabled)}
					onClick={item.onClick}
				>
					{<div onClick={item.onClick}>{item.text}</div>}
				</DropdownItem>
			}
		})
	}
	render() {
		return (
			<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret={this.props.caret}>
					{this.props.text}
				</DropdownToggle>
				<DropdownMenu>
					{this.renderDropDownItems()}
				</DropdownMenu>
			</ButtonDropdown>
		);
	}
}
