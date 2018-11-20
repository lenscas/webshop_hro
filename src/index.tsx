
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/header";
import Routes from './components/routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { API } from "./services/basics";
import { props } from './types/BasicProps';
import {storeLocalRaw, readLocalRaw} from "./services/localStorage";


type appState = {
	userId?: string
	alerts: string[]
	token?: string
}

class App extends React.Component<{}, appState>{
	constructor(propsy : props){
		super(propsy)
		this.state = {alerts:[]}
	}
	public clearAlerts() {
		this.setState(st => ({ ...st, alerts: [] }))
	}
	public setToken(token :string){
		this.setState(st=>({...st,token}))
		storeLocalRaw("token",token)
	}
	public render() {
		const maybeToken = this.state.token || readLocalRaw("token")
		const api = new API( (token :string)=>this.setState(st=>({...st,token})),maybeToken);
		api.setOnAll(data=>this.setState((st=>({...st,userId:data.userId}))))
		// tslint:disable-next-line:no-console
		api.setOnError(data=>console.error(data))
		const APIS = {
			// tslint:disable-next-line:no-console
			setHeader: (header: string) => console.log(header),
			req: api,
			userId: this.state.userId,
			setUserId: (newUserId?: string) => this.setState((st) => ({ ...st, userId: newUserId })),
			clearAlerts: () => this.clearAlerts(),
		}
		return (
			<Router>
				<div>
					<Header />
					<div className="container-fluid">
						<Routes APIS={APIS} />
					</div>
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();
