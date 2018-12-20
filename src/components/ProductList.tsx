import * as React from "react";
import "../style/productList.css"
import BasicPage from "../types/smallComponent";
import { productList, cardId} from "../services/product";
import DataTable, { renderable } from "./DataTable";
import { Link, match } from "react-router-dom";
import { addAsync } from "../funcs/lambdas";
import Button from "reactstrap/lib/Button";
import Price from "src/components/Price";
import { quantMod } from "src/components/addToCart";
import { cartItem } from "src/services/Cart";
import { API } from "src/services/basics";

type fourOfAKind<T> = [T,T?,T?,T?]
type fourProducts = fourOfAKind<productList>
type splittedCard = {
    title : string
    id: cardId
} | {
    image : string,
    id : cardId
} |
    {
        id:cardId,
        price: number,
        name: string
    }
type ProductListProps = {
    match? :match<{pageNum:string}>
    fetch : (num:number)=>Promise<productList[]>
    req : API
    urlHandler : (param :string)=>void
    pageNum: number
}
export default class CardList extends BasicPage<ProductListProps> {
    modOnClick(cart: cartItem, mod: number){
        const cartThing: cartItem = {id: cart.id, name: cart.name, price: "", priceNum : cart.priceNum, quantity : 1, priceTotal : "", priceTotalNum : 0}
        return ()=>quantMod(cartThing, mod, this.props.req)
    }
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
    makeRenderable(products : splittedCard[]){
        return products.map( (prod,key)=>{
            if(prod){
                return this.makeLink(prod,key)
            }
            return {key,element:<></>}
        })
    }
    makeLink(p :splittedCard,key:number) : renderable{
        if("title" in p){
            return {
                key: p.id +" title",
                element :(
                    <div className="listNameContainer">
                        <h4 className="listName">{p.title}</h4>
                    </div>
                )
            }
        } else if("image" in p){
            return {
                key : p.id + " image",
                element: (
                    <Link key={p.id} to={`/product/${p.id}`}>
                        <img className="img-fluid"src={p.image}/>
                    </Link>
                )
            }
        } else if("price" in p){
            return {
                key: p.id + "price",
                element: (
                    <div className="row pt-2">
                            <div className="col-8">
                                <span id="pPrice"><Price price={p.price}/></span>
                            </div>
                            <div className="col-4">
                                <Button onClick={this.modOnClick({
                                    id: p.id,
                                    name: p.name,
                                    price: "",
                                    priceNum: p.price,
                                    quantity: 0,
                                    priceTotal: "",
                                    priceTotalNum: 1
                                }, 1)} className="btn-md float-right" id="addCart"color="success">Add to cart</Button>{' '}
                            </div>
                        </div>
                )
            }
        }
        return {key,element:<></>}
    }

    render(){
        const render = (p : splittedCard[])=>this.makeRenderable(p)
        const combined =  addAsync<productList[],splittedCard[][]>(
            this.props.fetch,
            (prodList:productList[] )=>{
                prodList.reverse()
                let firstSplit:splittedCard[][] = []
                const secondSplit:splittedCard[][] = []
                const putIntoSplit = (splited : splittedCard[][])=> {
                    const nameLines:splittedCard[] = []
                    firstSplit.forEach(split=>{const item = split.pop(); if(item){nameLines.unshift(item)}})
                    secondSplit.push(nameLines)
                    const imageLines:splittedCard[] = []
                    firstSplit.forEach(split=>{const item = split.pop(); if(item){imageLines.unshift(item)}})
                    secondSplit.push(imageLines)
                    const priceLines : splittedCard[] =[]
                    firstSplit.forEach(split=>{const item = split.pop(); if(item){priceLines.unshift(item)}})
                    secondSplit.push(priceLines)
                }
                prodList.forEach( (product,key) => {
                    const last:splittedCard[] = []
                    last.push({
                        id:product.id,
                        title:product.name
                    })
                    last.push({
                        image:product.image,
                        id:product.id
                    })
                    last.push({price:product.price, id:product.id, name:product.name})
                    firstSplit.push(last)
                    if( (key+1) % 4===0){
                        putIntoSplit(firstSplit)
                        firstSplit=[]
                    }
                });
                putIntoSplit(firstSplit)
                secondSplit.reverse();
                return secondSplit;
            }
        )
        return (
            <div id="cardList" className="row">
                <div className="col-2" style={{"border":"solid black 1px"}}>
                    <h2>Filters</h2>
                </div>
                <div className="col-10">
                    <DataTable<splittedCard[]>
                        fetch={combined}
                        render={render}
                        pageNumber= {this.props.pageNum}
                        setUrlHandler = {this.props.urlHandler}
                        hover={false}
                        striped={false}
                        equalWidth={true}
                        borderLess={true}
                    />
                </div>
        </div>)

	}
}