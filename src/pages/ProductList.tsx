import * as React from "react";
import BasicComponent from "../types/basicComponent";
import { getList, product } from "../services/productList";
import DataTable, { renderable } from "../components/DataTable";
import { Link } from "react-router-dom";

type trippleProducts = [product,product?,product?]

export default class ProductList extends BasicComponent {
    makeTriplets(products : product[]){
        const newList : trippleProducts[] = []
        let build : trippleProducts | product[] = []
        products.forEach( (prod,key)=>{
            if(key % 3 === 0){
                newList.push(build as trippleProducts)
                build = []
            }
            build.push(prod)
        })
        newList.push(build as trippleProducts)
        return newList
    }
    makeRenderable(products : trippleProducts){
        return products.map( (prod,key)=>{
            if(prod){
                return this.makeLink(prod)
            }
            return {key,element:<></>}
        })
    }
    makeLink(p :product) : renderable{
        return {
            key : p.id,
            element : (
                <Link key={p.id} to={`/product/${p.id}`}>
                    <img src="https://img.scryfall.com/cards/normal/en/ody/59.jpg?1517813031"/>
                </Link>
            )
        }
    }
    render(){
         const fetch = async (num : number) => await getList(this.props.APIS.req,num)
         const render = (p : trippleProducts)=>this.makeRenderable(p)
         const converter = (res : product[])=>this.makeTriplets(res)
        return (
            <DataTable<product,trippleProducts>
                APIS={this.props.APIS}
                fetch={fetch}
                converter={converter}
                render={render}
            />
        )

	}
}