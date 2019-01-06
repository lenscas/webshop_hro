
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/header";
import Routes from './components/routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { API } from "./services/basics";
import { props } from './types/BasicProps';
import { storeLocalRaw, readLocalRaw } from "./services/localStorage";


type appState = {
	userId?: string
	role?: string
	shoppingCartId?: number
	alerts: string[]
	token?: string
	refreshToken?: string
}

class App extends React.Component<{}, appState>{
	constructor(propsy: props) {
		super(propsy)
		this.state = { alerts: [] }
	}

	componentDidMount() {
		const userId = readLocalRaw("userId")
		if(userId !== undefined) {
			this.setState({...this.state, userId})
		}
		const role = readLocalRaw("role")
		if(role !== undefined) {
			this.setState({...this.state, role})
		}
	}

	public clearAlerts() {
		this.setState(st => ({ ...st, alerts: [] }))
	}

	public setToken(token: string, refreshToken: string) {
		this.setState(st => ({ ...st, token, refreshToken }))
		storeLocalRaw("token", token)
		storeLocalRaw("refreshToken", refreshToken)
		
		const shoppingCartId = this.state.shoppingCartId
		if (shoppingCartId !== undefined) {
			storeLocalRaw("shoppingCartId", shoppingCartId.toString())
		}
		const userId = this.state.userId;
		if(userId !== undefined) {
			storeLocalRaw("userId", userId.toString())
		}
		const role = this.state.role;
		if(role !== undefined) {
			storeLocalRaw("role", role)
		}
	}
	public render() {
		const maybeToken = this.state.token || readLocalRaw("token")
		const api = new API((token: string, refreshToken: string) => this.setToken(token, refreshToken), maybeToken);
		api.setOnAll(data => this.setState((st => ({ ...st, refreshToken: data.refreshToken, userId: data.userId, shoppingCartId: data.cartId, role: data.role }))))
		api.setOnError(data => console.error(data))
		const APIS = {
			setHeader: (header: string) => console.log(header),
			req: api,
			userId: this.state.userId ,
			shoppingCartId: this.state.shoppingCartId,
			role: this.state.role,
			setUserId: (newUserId?: string) => this.setState((st) => ({ ...st, userId: newUserId })),
			clearAlerts: () => this.clearAlerts(),
		}
		return (
			<Router>
				<div>
					<Header APIS={APIS} />
					<div className="container-fluid background">
						<Routes APIS={APIS} />
					</div>
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();
