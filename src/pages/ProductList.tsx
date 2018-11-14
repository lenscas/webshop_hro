import * as React from "react";
import BasicPage from "../types/basicComponent";
import { getList, productList } from "../services/productList";
import DataTable, { renderable } from "../components/DataTable";
import { Link } from "react-router-dom";
import { addAsync } from "../funcs/lambdas";
import Button from "reactstrap/lib/Button";

type fourProducts = [productList,productList?,productList?,productList?]

export default class ProductList extends BasicPage {
    makeTriplets(products : productList[]){
        const newList : fourProducts[] = []
        let build : fourProducts | productList[] = []
        products.forEach( (prod,key)=>{
            if(key % 4 === 0){
                newList.push(build as fourProducts)
                build = []
            }
            build.push(prod)
        })
        newList.push(build as fourProducts)
        return newList
    }
    makeRenderable(products : fourProducts){
        return products.map( (prod,key)=>{
            if(prod){
                return this.makeLink(prod)
            }
            return {key,element:<></>}
        })
    }
    makeLink(p :productList) : renderable{
        return {
            key : p.id,
            element : (<div id="testdiv"><h5 className="listName">{p.name}</h5>
                <Link key={p.id} to={`/product/${p.id}`}>
                    <img id="pImage"src={p.normal}/>
                </Link>
                <a id="pPrice">€ {p.price / 100}</a>
                <Button className="btn-sm" id="addCart"color="warning">Add to cart</Button>{' '}
                </div>)
                
        }
    }
    render(){
        const fetch = async (num : number) => await getList(this.props.APIS.req,num)
        const render = (p : fourProducts)=>this.makeRenderable(p)
        const converter = (res : productList[])=>this.makeTriplets(res)
        const combined =  addAsync<productList[], fourProducts[]>(fetch,converter)
        return (
            <div id="cardList">
            <img id="MagicLogoPPage"src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png"/>
            <DataTable<fourProducts>
                fetch={combined}
                render={render}
                hover={false}
                striped={false}
            />
        </div>)

	}
}