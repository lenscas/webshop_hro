
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/header";
import Routes from './components/routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { API } from "./services/basics";
import { props } from './types/BasicProps';


type appState = {
	userId?: string
	alerts: string[]
}

class App extends React.Component<{}, appState>{
	constructor(propsy : props){
		super(propsy)
		this.state = {alerts:[]}
	}
	public clearAlerts() {
		this.setState(st => ({ ...st, alerts: [] }))
	}
	public render() {
		const api = new API();
		api.setOnAll(data=>this.setState((st=>({...st,userId:data.userId}))))
		// tslint:disable-next-line:no-console
		api.setOnError(data=>console.error(data))
		api.doRequest("api/main")
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
