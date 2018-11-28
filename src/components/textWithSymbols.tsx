import * as React from 'react';
import BasicComponent from "src/types/smallComponent";
import "../style/symbol.css"
type textWithSymbolsProps= {
    text : string;
    classSymbols? :string
}

export default class TextWithSymbols extends BasicComponent<textWithSymbolsProps>{
    render(){
        let stringPart :string = ""
        const fullText :Array<JSX.Element | string>= []
        this.props.text.split("").forEach((char: string | JSX.Element ,k)=>{
           if (char === "{"){
                fullText.push(stringPart)
                stringPart = ""
            }else if (char === "}"){
                fullText.push(<span key={k}><img className={this.props.classSymbols || "defaultSymbol"} src={"/symbols/costs/mana"+stringPart.split("/").join("").toLowerCase()+".png"}/></span>)
                stringPart=""
            }
            else if(char==="\n"){
                fullText.push(stringPart)
                fullText.push(<br key={k}/>)
                stringPart = ""
            }
            else{
                stringPart = stringPart + char;
            }
        })
        fullText.push(stringPart)
        return fullText
    }
}