import { API, APIReturn } from "./basics";
import { searchCommander, searchResult } from "./search";

export type cardInDeck = {
	colors: color[] | Colorless;
	name: string;
	image: string;
	cmc: number;
	amount? :number
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
}/*
const testDecks : {[s: number] : deckList} = {
	1 : {
		commander: {
			id : "f8896272-4806-40ba-94fd-51310269aa07",
			name : "Sharuum the Hegemon",
			image:"https://img.scryfall.com/cards/normal/en/c16/221.jpg?1517813031",
			flavorText : "To gain audience with the hegemon, one must bring a riddle she has not heard.",
			oracleText : "Flying\nWhen Sharuum the Hegemon enters the battlefield, you may return target artifact card from your graveyard to the battlefield.",
			loyalty:null,
			power: "5",
			toughness:"5",
			price: 67,
			typeLine:"Legendary Artifact Creature — Sphinx"
		},
		cards : [{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/zen\/205.jpg?1517813031","name":"Khalni Gem"},{"cmc":4,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/7.jpg?1517813031","name":"Master Transmuter"},{"cmc":5,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/roe\/215.jpg?1530592795","name":"Angelheart Vial"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bfz\/241.jpg?1517813031","name":"Prairie Stream"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/pls\/138.jpg?1517813031","name":"Dromar's Cavern"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/278.jpg?1517813031","name":"Port Town"},{"cmc":3,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/69.jpg?1531451437","name":"Sai, Master Thopterist"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mbs\/141.jpg?1517813031","name":"Titan Forge"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddf\/64.jpg?1530591367","name":"Energy Chamber"},{"cmc":9,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m14\/206.jpg?1517813031","name":"Darksteel Forge"},{"cmc":4,"colors":["B"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/72.jpg?1517813031","name":"Necrotic Ooze"},{"cmc":1,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mma\/201.jpg?1517813031","name":"Arcbound Worker"},{"cmc":2,"colors":["B","U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arb\/31.jpg?1517813031","name":"Time Sieve"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/xln\/255.jpg?1527431458","name":"Glacial Fortress"},{"cmc":5,"colors":["B","U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/223.jpg?1517813031","name":"Sphinx Summoner"},{"cmc":6,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/td2\/16.jpg?1517813031","name":"Darksteel Sentinel"},{"cmc":5,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mm2\/62.jpg?1517813031","name":"Tezzeret the Seeker"},{"cmc":4,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/66.jpg?1531451404","name":"One with the Machine"},{"cmc":4,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/6.jpg?1517813031","name":"March of the Machines"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/216.jpg?1535504936","name":"Prototype Portal"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/td2\/51.jpg?1517813031","name":"Plague Myr"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ema\/227.jpg?1519049179","name":"Mindless Automaton"},{"cmc":3,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/106.jpg?1535503409","name":"Thirst for Knowledge"},{"cmc":4,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/43.jpg?1517813031","name":"Shape Anew"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/201.jpg?1517813031","name":"Semblance Anvil"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/238.jpg?1535505242","name":"Bojuka Bog"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mma\/199.jpg?1517813031","name":"Arcbound Stinger"},{"cmc":2,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/103.jpg?1517813031","name":"Vedalken Engineer"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/245.jpg?1535505351","name":"Evolving Wilds"},{"cmc":6,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/145.jpg?1517813031","name":"Contagion Engine"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/269.jpg?1517813031","name":"Shimmer Myr"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/a25\/242.jpg?1521726415","name":"Mishra's Factory"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/tpr\/245.jpg?1517813031","name":"Stalking Stones"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/228.jpg?1535505104","name":"Unwinding Clock"},{"cmc":5,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mm2\/49.jpg?1517813031","name":"Inexorable Tide"},{"cmc":4,"colors":["B","U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mbs\/97.jpg?1517813031","name":"Tezzeret, Agent of Bolas"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/181.jpg?1534112648","name":"Coldsteel Heart"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/278.jpg?1535505815","name":"Seat of the Synod"},{"cmc":5,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddf\/55.jpg?1530591334","name":"Clockwork Hydra"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/173.jpg?1517813031","name":"Lux Cannon"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddf\/44.jpg?1530591297","name":"Steel Overseer"},{"cmc":4,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddf\/69.jpg?1530591385","name":"Argivian Restoration"},{"cmc":5,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/202.jpg?1535504728","name":"Darksteel Juggernaut"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mm2\/219.jpg?1531565667","name":"Lodestone Golem"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c13\/250.jpg?1517813031","name":"Obelisk of Esper"},{"cmc":1,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/usg\/311.jpg?1517813031","name":"Thran Turbine"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/eve\/172.jpg?1517813031","name":"Scarecrone"},{"cmc":5,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/211.jpg?1535504858","name":"Mirrorworks"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/286.jpg?1535505932","name":"Terramorphic Expanse"},{"cmc":5,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m14\/216.jpg?1517813031","name":"Ring of Three Wishes"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mm2\/204.jpg?1517813031","name":"Chimeric Mass"},{"cmc":6,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddf\/57.jpg?1530591341","name":"Triskelion"},{"cmc":6,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/205.jpg?1535504765","name":"Duplicant"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/td2\/67.jpg?1517813031","name":"Contagion Clasp"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/160.jpg?1517813031","name":"Golem Foundry"},{"cmc":4,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/nph\/42.jpg?1517813031","name":"Phyrexian Metamorph"},{"cmc":4,"colors":["W"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/1.jpg?1517813031","name":"Leonin Abunas"},{"cmc":5,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/td2\/14.jpg?1517813031","name":"Kuldotha Forgemaster"},{"cmc":4,"colors":["U","W"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/97.jpg?1517813031","name":"Unbender Tine"},{"cmc":5,"colors":["B"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mm2\/98.jpg?1517813031","name":"Spread the Sickness"},{"cmc":4,"colors":["W"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/76.jpg?1517813031","name":"Sanctum Gargoyle"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/e02\/44.jpg?1524753853","name":"Quicksilver Amulet"},{"cmc":1,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m11\/219.jpg?1517813031","name":"Voltaic Key"},{"cmc":7,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/112.jpg?1517813031","name":"Memnarch"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/241.jpg?1535505290","name":"Darksteel Citadel"},{"cmc":7,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/209.jpg?1534112965","name":"Pentavus"},{"cmc":3,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/92.jpg?1517813031","name":"Master of Etherium"},{"cmc":4,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/dst\/156.jpg?1517813031","name":"Voltaic Construct"},{"cmc":3,"colors":["U"],"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/hop\/9.jpg?1517813031","name":"Fabricate"},{"cmc":3,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/228.jpg?1531451263","name":"Chaos Wand"},{"cmc":2,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/gtc\/231.jpg?1517813031","name":"Illusionist's Bracers"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/9\/3\/93653b18-3821-485e-afeb-edafb0a9e84e.jpg?1541002853","name":"Plains"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/5\/5\/55fce17b-f57f-4863-bf74-71e45bec4040.jpg?1541002797","name":"Swamp"},{"cmc":0,"colors":{},"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/2\/3\/23300152-6da8-4444-b368-1fb00e74a4b2.jpg?1541002792","name":"Island"}]
	},
	3 : {
		commander: {
			id: "1b1c4bed-9b6b-42f9-939d-ece0f959a0a3",
			name: "Niv-Mizzet, Dracogenius",
			image: "https://img.scryfall.com/cards/normal/en/c17/184.jpg?1517813031",
			flavorText: "He has no patience for minds that do not inspire him or explode by trying.",
			oracleText: "Flying\nWhenever Niv-Mizzet, Dracogenius deals damage to a player, you may draw a card.\n{U}{R}: Niv-Mizzet, Dracogenius deals 1 damage to any target.",
			loyalty: null,
			power: "5",
			toughness: "5",
			price: 23,
			typeLine: "Legendary Creature — Dragon Wizard"
		},
		cards: [{ "colors": {}, "name": "Dreamstone Hedron", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/204.jpg?1535504753", "cmc": 6 }, { "colors": ["U"], "name": "Reins of Power", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/96.jpg?1517813031", "cmc": 4 }, { "colors": ["R"], "name": "Goblin Game", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/pls\/61.jpg?1517813031", "cmc": 7 }, { "colors": ["R"], "name": "Reverberate", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m13\/145.jpg?1517813031", "cmc": 2 }, { "colors": ["U"], "name": "Wandering Eye", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/nem\/50.jpg?1517813031", "cmc": 3 }, { "colors": ["U"], "name": "Eye of the Storm", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/rav\/48.jpg?1517813031", "cmc": 7 }, { "colors": ["U"], "name": "Sunken Hope", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/pca\/26.jpg?1517813031", "cmc": 5 }, { "colors": {}, "name": "Crawlspace", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c13\/240.jpg?1517813031", "cmc": 3 }, { "colors": ["U"], "name": "Mnemonic Wall", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/67.jpg?1530591953", "cmc": 5 }, { "colors": {}, "name": "Temple Bell", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/277.jpg?1517813031", "cmc": 3 }, { "colors": ["R"], "name": "Furnace of Rath", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/dpa\/44.jpg?1517813031", "cmc": 4 }, { "colors": ["U"], "name": "Cast Through Time", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/roe\/55.jpg?1530592213", "cmc": 7 }, { "colors": {}, "name": "Thran Dynamo", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/230.jpg?1530592677", "cmc": 4 }, { "colors": ["U"], "name": "Wall of Frost", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/mm3\/56.jpg?1517813031", "cmc": 3 }, { "colors": ["R"], "name": "Cerebral Eruption", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/86.jpg?1517813031", "cmc": 4 }, { "colors": ["U"], "name": "Clone", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m14\/47.jpg?1517813031", "cmc": 4 }, { "colors": ["R"], "name": "Guild Feud", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/rtr\/97.jpg?1517813031", "cmc": 6 }, { "colors": ["R"], "name": "Manabarbs", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m12\/150.jpg?1517813031", "cmc": 4 }, { "colors": ["R"], "name": "Outmaneuver", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/usg\/205.jpg?1517813031", "cmc": 1 }, { "colors": ["R"], "name": "Burning Inquiry", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m10\/128.jpg?1517813031", "cmc": 1 }, { "colors": {}, "name": "Manalith", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/239.jpg?1531451387", "cmc": 3 }, { "colors": {}, "name": "Sky Diamond", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c14\/269.jpg?1530678899", "cmc": 2 }, { "colors": {}, "name": "Everflowing Chalice", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/188.jpg?1534112724", "cmc": 0 }, { "colors": ["U"], "name": "Dictate of Kruphix", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/86.jpg?1535503094", "cmc": 3 }, { "colors": {}, "name": "Knowledge Pool", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/mbs\/111.jpg?1517813031", "cmc": 6 }, { "colors": ["R", "U"], "name": "Steam Augury", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c15\/233.jpg?1519045603", "cmc": 4 }, { "colors": ["R"], "name": "Possibility Storm", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/dgm\/34.jpg?1517813031", "cmc": 5 }, { "colors": ["U"], "name": "Conundrum Sphinx", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/84.jpg?1535503065", "cmc": 4 }, { "colors": ["U"], "name": "Planar Overlay", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/pls\/28.jpg?1517813031", "cmc": 3 }, { "colors": ["U"], "name": "Hive Mind", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m10\/54.jpg?1517813031", "cmc": 6 }, { "colors": ["R"], "name": "Burning Earth", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m14\/130.jpg?1517813031", "cmc": 4 }, { "colors": ["R"], "name": "Destructive Force", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m11\/133.jpg?1517813031", "cmc": 7 }, { "colors": {}, "name": "Ankh of Mishra", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/vma\/263.jpg?1517813031", "cmc": 2 }, { "colors": ["R"], "name": "Anger of the Gods", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/116.jpg?1530592167", "cmc": 3 }, { "colors": ["U"], "name": "Conjured Currency", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/rtr\/33.jpg?1517813031", "cmc": 6 }, { "colors": ["R"], "name": "Scrambleverse", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/m12\/153.jpg?1517813031", "cmc": 8 }, { "colors": ["U"], "name": "Shared Fate", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/mrd\/49.jpg?1517813031", "cmc": 5 }, { "colors": {}, "name": "Pristine Talisman", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/211.jpg?1534112989", "cmc": 3 }, { "colors": {}, "name": "Uba Mask", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/chk\/272.jpg?1517813031", "cmc": 4 }, { "colors": ["U"], "name": "Windfall", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/55.jpg?1534111109", "cmc": 3 }, { "colors": ["U"], "name": "Frantic Search", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/vma\/70.jpg?1517813031", "cmc": 3 }, { "colors": ["R", "U"], "name": "Nucklavee", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/dds\/26.jpg?1517813031", "cmc": 6 }, { "colors": ["U"], "name": "Dormant Gomazoa", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/roe\/62.jpg?1530592249", "cmc": 3 }, { "colors": {}, "name": "Star Compass", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/229.jpg?1530592673", "cmc": 2 }, { "colors": {}, "name": "Opaline Unicorn", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/cn2\/213.jpg?1517813031", "cmc": 3 }, { "colors": ["U"], "name": "Mana Breach", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/7ed\/85.jpg?1517813031", "cmc": 3 }, { "colors": ["U"], "name": "Aether Barrier", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/nem\/27.jpg?1517813031", "cmc": 3 }, { "colors": {}, "name": "Pyxis of Pandemonium", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/220.jpg?1517813031", "cmc": 1 }, { "colors": ["R"], "name": "Molten Psyche", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/98.jpg?1517813031", "cmc": 3 }, { "colors": ["R"], "name": "Whims of the Fates", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/c16\/139.jpg?1517813031", "cmc": 6 }, { "colors": {}, "name": "Iron Myr", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/168.jpg?1517813031", "cmc": 2 }, { "colors": {}, "name": "Silver Myr", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/td2\/8.jpg?1517813031", "cmc": 2 }, { "colors": ["R"], "name": "Price of Progress", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ema\/141.jpg?1519048689", "cmc": 2 }, { "colors": ["U"], "name": "Sea Scryer", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/mir\/90.jpg?1517813031", "cmc": 2 }, { "colors": ["R"], "name": "Rage Nimbus", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/roe\/160.jpg?1530592598", "cmc": 3 }, { "colors": {}, "name": "Traveler's Amulet", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/rix\/184.jpg?1524752658", "cmc": 1 }, { "colors": {}, "name": "Goblin Lyre", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/ice\/319.jpg?1517813031", "cmc": 3 }, { "colors": ["R"], "name": "Mogg Assassin", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/exo\/88.jpg?1517813031", "cmc": 3 }, { "colors": ["R"], "name": "Rite of Ruin", "image": "https:\/\/img.scryfall.com\/cards\/normal\/en\/avr\/153.jpg?1517813031", "cmc": 7 }, { "colors": {}, "name": "Mountain", amount:20, "image": "https:\/\/img.scryfall.com\/cards\/normal\/front\/8\/4\/84c3e407-2828-40e5-b335-7a0a3df1e5ad.jpg?1541002913", "cmc": 0 }, { "colors": {}, "name": "Island", "image": "https:\/\/img.scryfall.com\/cards\/normal\/front\/2\/3\/23300152-6da8-4444-b368-1fb00e74a4b2.jpg?1541002792", "cmc": 0,amount:20 }]
	},
	2 : {
		commander: {
			id : "ffa2b070-952e-4242-83bb-3e73135ceeeb",
			name: "Sidisi, Brood Tyrant",
			image : "https://img.scryfall.com/cards/normal/en/ktk/199.jpg?1517813031",
			flavorText:"",
			oracleText:	"Whenever Sidisi, Brood Tyrant enters the battlefield or attacks, put the top three cards of your library into your graveyard.\nWhenever one or more creature cards are put into your graveyard from your library, create a 2/2 black Zombie creature token.",
			typeLine:"Legendary Creature — Naga Shaman",
			power:"3",
			toughness:"3",
			loyalty:null,
			price:85
		},
		cards:[{"colors":["B","G"],"cmc":7,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/dgm\/126a.jpg?1520204342","name":"Down \/\/ Dirty"},{"colors":["G"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/199.jpg?1517813031","name":"Crawling Sensation"},{"colors":{},"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/225.jpg?1517813031","name":"Sultai Banner"},{"colors":["B"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/110.jpg?1528916029","name":"Whip of Erebos"},{"colors":["G"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/dtk\/206.jpg?1517813031","name":"Sheltered Aerie"},{"colors":["U"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/51.jpg?1531451266","name":"Divination"},{"colors":["G"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/isd\/205.jpg?1517813031","name":"Splinterfright"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/259.jpg?1535505544","name":"Jungle Hollow"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/287.jpg?1535505945","name":"Thornwood Falls"},{"colors":["B","G","U"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/203.jpg?1517813031","name":"Sultai Ascendancy"},{"colors":["B"],"cmc":1,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/133.jpg?1517813031","name":"Sanitarium Skeleton"},{"colors":["B","G"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddm\/63.jpg?1517813031","name":"Reaper of the Wilds"},{"colors":["B","G"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/153.jpg?1517813031","name":"Nyx Weaver"},{"colors":["B"],"cmc":7,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/75.jpg?1517813031","name":"Abhorrent Overlord"},{"colors":["B","G"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/172.jpg?1517813031","name":"Death Frenzy"},{"colors":["G"],"cmc":1,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/a25\/193.jpg?1521724958","name":"Vessel of Nascency"},{"colors":["B"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/116.jpg?1531452153","name":"Reassembling Skeleton"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/165.jpg?1517813031","name":"Temple of Malady"},{"colors":["B","G","U"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/204.jpg?1517813031","name":"Sultai Charm"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/220.jpg?1517813031","name":"Obsessive Skinner"},{"colors":["B"],"cmc":6,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/109.jpg?1517813031","name":"Ever After"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/nem\/114.jpg?1517813031","name":"Saproling Cluster"},{"colors":["G"],"cmc":1,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/234.jpg?1517813031","name":"Traverse the Ulvenwald"},{"colors":["U"],"cmc":6,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/frf\/54.jpg?1517813031","name":"Supplant Form"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/202.jpg?1531450999","name":"Talons of Wildwood"},{"colors":["U"],"cmc":8,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/53.jpg?1534111088","name":"Treasure Cruise"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/253.jpg?1535505457","name":"Halimar Depths"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/290.jpg?1535505987","name":"Tranquil Thicket"},{"colors":["U"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/47.jpg?1517813031","name":"Pull from the Deep"},{"colors":["B","G","U"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/211.jpg?1517813031","name":"Villainous Wealth"},{"colors":["B","G"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/rtr\/175.jpg?1517813031","name":"Jarad's Orders"},{"colors":["B"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/frf\/82.jpg?1517813031","name":"Sibsig Host"},{"colors":["G"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/usg\/273.jpg?1517813031","name":"Sporogenesis"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cma\/143.jpg?1519869731","name":"Satyr Wayfinder"},{"colors":["G"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/dtk\/204.jpg?1517813031","name":"Shaman of Forgotten Ways"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/238.jpg?1535505242","name":"Bojuka Bog"},{"colors":["B","G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/e\/e\/eeb8576a-752c-4f11-9f4c-75a6e77a085c.jpg?1541002964","name":"Drown in Filth"},{"colors":["G"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/frf\/139.jpg?1517813031","name":"Sudden Reclamation"},{"colors":["B"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c15\/129.jpg?1519044894","name":"Nighthowler"},{"colors":["B"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/81.jpg?1517813031","name":"Murderous Cut"},{"colors":["B","G","U"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/193.jpg?1517813031","name":"Rakshasa Vizier"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/190.jpg?1531450895","name":"Naturalize"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ema\/162.jpg?1519048793","name":"Commune with the Gods"},{"colors":["B","G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/5\/a\/5a0ed012-1dea-4967-a618-0d7d90a0eab8.jpg?1541002982","name":"Grisly Salvage"},{"colors":["B"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/110.jpg?1531452084","name":"Murder"},{"colors":["G"],"cmc":6,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/226.jpg?1517813031","name":"Seasons Past"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/frf\/144.jpg?1517813031","name":"Whisperer of the Wilds"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/260.jpg?1534113497","name":"Opulent Palace"},{"colors":["G"],"cmc":7,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/156.jpg?1535504079","name":"Moldgraf Monstrosity"},{"colors":["U"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/57.jpg?1517813031","name":"Taigam's Scheming"},{"colors":["U"],"cmc":6,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/54.jpg?1517813031","name":"Set Adrift"},{"colors":["B","G"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cn2\/205.jpg?1517813031","name":"Pharika's Mender"},{"colors":["G"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bbd\/210.jpg?1529063153","name":"Return to the Earth"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/180.jpg?1517813031","name":"Sylvan Caryatid"},{"colors":{},"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/230.jpg?1531451289","name":"Desecrated Tomb"},{"colors":["B","G"],"cmc":4,"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/8\/e\/8e3b1844-6fff-40dc-a357-3394f63ea8dc.jpg?1541002705","name":"Jarad, Golgari Lich Lord"},{"colors":{},"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/239.jpg?1531451387","name":"Manalith"},{"colors":{},"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bfz\/201.jpg?1517813031","name":"Catacomb Sifter"},{"colors":["G"],"cmc":2,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/177.jpg?1531450783","name":"Druid of the Cowl"},{"colors":["B","G","U"],"cmc":6,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/182.jpg?1517813031","name":"Kheru Lich Lord"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/244.jpg?1535505335","name":"Dismal Backwater"},{"colors":["B"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/112.jpg?1531452108","name":"Open the Graves"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/266.jpg?1535505643","name":"Mortuary Mire"},{"colors":["U"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m19\/70.jpg?1531451447","name":"Salvager of Secrets"},{"colors":{},"cmc":1,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/262.jpg?1517813031","name":"Shard of Broken Glass"},{"colors":["B","G","U"],"cmc":5,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/205.jpg?1517813031","name":"Sultai Soothsayer"},{"colors":["B"],"cmc":1,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/frf\/80.jpg?1517813031","name":"Qarsi High Priest"},{"colors":["G"],"cmc":3,"image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/153.jpg?1517813031","name":"Bow of Nylea"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/2\/3\/23300152-6da8-4444-b368-1fb00e74a4b2.jpg?1541002792","name":"Island"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/5\/c\/5c6b733c-b67f-472b-aea3-c59e1f78dc55.jpg?1541002751","name":"Forest"},{"colors":{},"cmc":0,"image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/5\/5\/55fce17b-f57f-4863-bf74-71e45bec4040.jpg?1541002797","name":"Swamp"}]
	},
	4 : {
		commander : {
			id : "ffa2b070-952e-4242-83bb-3e73135ceeeb",
			name: "Phenax, God of Deception",
			image : "https://img.scryfall.com/cards/normal/en/bng/152.jpg?1517813031",
			flavorText:"",
			oracleText:	"Whenever Sidisi, Brood Tyrant enters the battlefield or attacks, put the top three cards of your library into your graveyard.\nWhenever one or more creature cards are put into your graveyard from your library, create a 2/2 black Zombie creature token.",
			typeLine:"Legendary Creature — Naga Shaman",
			power:"3",
			toughness:"3",
			loyalty:null,
			price:85
		},cards:[{"name":"Djinn of Wishes","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/87.jpg?1535503108","cmc":5,"colors":["U"]},{"name":"Soliton","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/204.jpg?1517813031","cmc":5,"colors":{}},{"name":"Mysteries of the Deep","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/wwk\/33.jpg?1530592258","cmc":5,"colors":["U"]},{"name":"Doom Blade","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/e02\/18.jpg?1524753700","cmc":2,"colors":["B"]},{"name":"Treasure Cruise","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cm2\/53.jpg?1534111088","cmc":8,"colors":["U"]},{"name":"Psychic Intrusion","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/200.jpg?1517813031","cmc":5,"colors":["B","U"]},{"name":"Altar of the Brood","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/216.jpg?1517813031","cmc":1,"colors":{}},{"name":"Belbe's Armor","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/nem\/126.jpg?1517813031","cmc":3,"colors":{}},{"name":"Mana Leak","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/66.jpg?1530591948","cmc":2,"colors":["U"]},{"name":"Thassa's Devourer","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/53.jpg?1517813031","cmc":5,"colors":["U"]},{"name":"Crab Umbra","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/roe\/58.jpg?1530592229","cmc":1,"colors":["U"]},{"name":"Mindeye Drake","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/gtc\/43.jpg?1517813031","cmc":5,"colors":["U"]},{"name":"Jace's Ingenuity","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m15\/63.jpg?1517813031","cmc":5,"colors":["U"]},{"name":"Echo Mage","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c13\/43.jpg?1517813031","cmc":3,"colors":["U"]},{"name":"Mistvein Borderpost","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/90.jpg?1517813031","cmc":3,"colors":["B","U"]},{"name":"Summoner's Bane","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddm\/31.jpg?1517813031","cmc":4,"colors":["U"]},{"name":"Belltower Sphinx","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m12\/46.jpg?1517813031","cmc":5,"colors":["U"]},{"name":"Springleaf Drum","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bng\/162.jpg?1517813031","cmc":1,"colors":{}},{"name":"Dimir Signet","image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/f\/5\/f56861a7-b664-468f-bad7-838c02530827.jpg?1541002783","cmc":2,"colors":{}},{"name":"Mnemonic Wall","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/67.jpg?1530591953","cmc":5,"colors":["U"]},{"name":"Triton Tactics","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ddt\/23.jpg?1517813031","cmc":1,"colors":["U"]},{"name":"Siren of the Silent Song","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bng\/155.jpg?1517813031","cmc":3,"colors":["B","U"]},{"name":"Dimir Cluestone","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/dgm\/138.jpg?1517813031","cmc":3,"colors":{}},{"name":"Tideforce Elemental","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/wwk\/41.jpg?1530592306","cmc":3,"colors":["U"]},{"name":"Siren Song Lyre","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bng\/161.jpg?1517813031","cmc":2,"colors":{}},{"name":"Chancellor of the Spires","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/nph\/31.jpg?1517813031","cmc":7,"colors":["U"]},{"name":"Bonehoard","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/cma\/211.jpg?1519870684","cmc":4,"colors":{}},{"name":"Terramorphic Expanse","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/286.jpg?1535505932","cmc":0,"colors":{}},{"name":"Thornbite Staff","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mor\/145.jpg?1517813031","cmc":2,"colors":{}},{"name":"Skywise Teachings","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ima\/73.jpg?1530591988","cmc":4,"colors":["U"]},{"name":"Leaden Myr","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/som\/170.jpg?1517813031","cmc":2,"colors":{}},{"name":"Fated Return","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bng\/69.jpg?1517813031","cmc":7,"colors":["B"]},{"name":"Deathbringer Regent","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c17\/110.jpg?1517813031","cmc":7,"colors":["B"]},{"name":"Refocus","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/frf\/47.jpg?1517813031","cmc":2,"colors":["U"]},{"name":"Dismal Backwater","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/244.jpg?1535505335","cmc":0,"colors":{}},{"name":"Power Sink","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/vma\/88.jpg?1517813031","cmc":1,"colors":["U"]},{"name":"Nirkana Revenant","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/bbd\/150.jpg?1536717962","cmc":6,"colors":["B"]},{"name":"Dinrova Horror","image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/c\/0\/c0018de2-0646-48fe-8112-11952867c3bb.jpg?1541002745","cmc":6,"colors":["B","U"]},{"name":"Extinguish All Hope","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/68.jpg?1517813031","cmc":6,"colors":["B"]},{"name":"Drownyard Explorers","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/soi\/56.jpg?1517813031","cmc":4,"colors":["U"]},{"name":"Remove Soul","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/me3\/47.jpg?1517813031","cmc":2,"colors":["U"]},{"name":"Disciple of Deceit","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/148.jpg?1517813031","cmc":2,"colors":["B","U"]},{"name":"Spin into Myth","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/arc\/8.jpg?1517813031","cmc":5,"colors":["U"]},{"name":"Kalitas, Bloodchief of Ghet","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/zen\/99.jpg?1517813031","cmc":7,"colors":["B"]},{"name":"Clever Impersonator","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/34.jpg?1517813031","cmc":4,"colors":["U"]},{"name":"Daze","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ema\/44.jpg?1519048101","cmc":2,"colors":["U"]},{"name":"Psychic Barrier","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/nph\/43.jpg?1517813031","cmc":2,"colors":["U"]},{"name":"Witches' Eye","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/222.jpg?1517813031","cmc":1,"colors":{}},{"name":"Revelsong Horn","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/shm\/261.jpg?1517813031","cmc":2,"colors":{}},{"name":"Horseshoe Crab","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/a25\/61.jpg?1521725540","cmc":3,"colors":["U"]},{"name":"Selhoff Occultist","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/isd\/73.jpg?1517813031","cmc":3,"colors":["U"]},{"name":"Miscalculation","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ulg\/36.jpg?1517813031","cmc":2,"colors":["U"]},{"name":"Nighthowler","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c15\/129.jpg?1519044894","cmc":3,"colors":["B"]},{"name":"Clone","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m14\/47.jpg?1517813031","cmc":4,"colors":["U"]},{"name":"Kheru Spellsnatcher","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ktk\/45.jpg?1517813031","cmc":4,"colors":["U"]},{"name":"Ponder","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/c18\/96.jpg?1535503251","cmc":1,"colors":["U"]},{"name":"Psychic Strike","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/gtc\/189.jpg?1517813031","cmc":3,"colors":["B","U"]},{"name":"Countermand","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/jou\/33.jpg?1517813031","cmc":4,"colors":["U"]},{"name":"Sea Scryer","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/mir\/90.jpg?1517813031","cmc":2,"colors":["U"]},{"name":"Jace's Erasure","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/m12\/60.jpg?1517813031","cmc":2,"colors":["U"]},{"name":"Ashiok, Nightmare Weaver","image":"https:\/\/img.scryfall.com\/cards\/normal\/en\/ths\/188.jpg?1517813031","cmc":3,"colors":["B","U"]},{"name":"Island","image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/2\/3\/23300152-6da8-4444-b368-1fb00e74a4b2.jpg?1541002792","cmc":0,"colors":{}},{"name":"Swamp","image":"https:\/\/img.scryfall.com\/cards\/normal\/front\/5\/5\/55fce17b-f57f-4863-bf74-71e45bec4040.jpg?1541002797","cmc":0,"colors":{}}]
	}
}
*/
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
				colors : {},
				name : v.name,
				image : v.image,
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
	/*
	return [
		{
			name : "Mindless automation",
			image : "https://img.scryfall.com/cards/art_crop/en/c16/221.jpg?1517813031",
			fullImage :  "https://img.scryfall.com/cards/normal/en/c16/221.jpg?1517813031",
			id : 1
		},
		{
			name : "Mill myself",
			image : "https://img.scryfall.com/cards/art_crop/en/ktk/199.jpg?1517813031",
			fullImage :"https://img.scryfall.com/cards/normal/en/ktk/199.jpg?1517813031",
			id : 2
		},
		{
			name : "CHAOS!",
			image : "https://img.scryfall.com/cards/art_crop/en/c17/184.jpg?1517813031",
			fullImage :  "https://img.scryfall.com/cards/normal/en/c17/184.jpg?1517813031",
			id : 3
		},
		{
			name : "Untap that",
			image : "https://img.scryfall.com/cards/art_crop/en/bng/152.jpg?1517813031",
			fullImage : "https://img.scryfall.com/cards/normal/en/bng/152.jpg?1517813031",
			id : 4
		}
	]*/
}
// Generated by https://quicktype.io


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