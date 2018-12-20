import { API, APIReturn } from "./basics";
import { searchCommander, searchResult } from "./search";

export type cardInDeck = {
	colors: color[] | Colorless;
	name: string
	image: string
	cmc: number
	typeLine: string
}

export enum color {
	R = "R",
	U = "U",
	W = "W",
	B = "B",
	G = "G"
}

export type Colorless = {}

export type deckList = {
	commander: {
		name : string,
		image : string
	},
	cards: cardInDeck[]
}
export type decks = {
	name : string
	image : string
	fullImage : string
	id : number
}
export interface IDeckListResponce {
	id:        number;
	name:      string;
	image:     string;
	fullImage: string;
	cards:     ICardResponce[];
}

export interface ICardResponce {
	id:         string;
	name:       string;
	image:      string;
	flavorText: null | string;
	oracleText: string;
	loyalty:    null;
	power:      null;
	toughness:  null;
	price:      number;
	typeLine:   string;
	color:      color[];
	mana:       IManaResponce[];
}

export interface IManaResponce {
	id:          number;
	strSymbol:   string;
	picturePath: null;
}

export type insertDeck = {
	deck_name : string
	commander_name_1 : string
	commander_name_2? : string

}
export const getDeckList = async (api: API, id:string): Promise<deckList | undefined> => {
	return await api.doRequest<IDeckListResponce,deckList>(
		"api/decks/"+id,
		(t:APIReturn<IDeckListResponce>)=>({
			commander : {
				name : t.data.name,
				image : t.data.fullImage
			},
			cards : t.data.cards.map(v=>({
				colors : v.color,
				name : v.name,
				image : v.image,
				typeLine : v.typeLine,
				cmc : v.mana.reduce<number>( (cur,m)=>{
					const asSymbol = m.strSymbol.replace("{","").replace("}","")
					if(Number(asSymbol)){
						return cur + Number(asSymbol)
					}
					return cur + 1
				},0)
			}))

		})
	)
	
}
export const getDecks = async (api : API): Promise<decks[]> => {
	return (await api.doRequest<decks[]>("api/decks",(t:any)=>t.data) || [])
}
export const createDeck = async(api:API,deck:insertDeck)=>{
	const [mainCommander] = await searchCommander(deck.commander_name_1)//[0]
	let secondCommander : searchResult | undefined
	if(deck.commander_name_2){
		[secondCommander] = await searchCommander(deck.commander_name_2)[0]
	}
	if(!mainCommander){
		return false
	}
	if( (!secondCommander) && deck.commander_name_2){
		return false
	}
	const res = await (
		api.buildRequest("path","api/decks")
		.buildRequest("method","POST")
		.buildRequest("body",{
			Name : deck.deck_name,
			Commander : mainCommander.id,
			SecondaryCommander : secondCommander && secondCommander.id 
		})
		.buildRequest("converter",(t:any)=>t.data.deckId)
	).run<number>()
	return res
}
export const addCardToDeck = async (api : API, deckId : number ,printId : string)=>{
	const res = await(
		api.buildRequest("path","api/decks/addCard")
		.buildRequest("method","POST")
		.buildRequest("body",{
			printId ,deckId
		}).buildRequest("converter",(t:any)=>t.success)
	).run<boolean>()
	return res
}
export const addDeckToCart = async (api: API, deckId : string)=>{
	return await (
		api.buildRequest("path","api/decks/"+deckId)
		.buildRequest("method","POST")
		.buildRequest("converter",(t:any)=>t.data)
	).run<string[]>()
}