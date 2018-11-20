import * as React from "react";
import {sepNumNumber} from "../funcs/lambdas"
const price = (props :{price:number}) => <span>&euro;{sepNumNumber(props.price)}</span>
export default price