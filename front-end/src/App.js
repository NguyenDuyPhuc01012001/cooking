import React, { Component } from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import OnDeveloping from './components/error/on-developing';
import NotFound from './components/error/not-found';
import Home from './components/home/home';
const User = React.lazy(() => import('./pages/user.jsx'));
const Admin = React.lazy(() => import('./pages/admin.jsx'));
const ActivationEmail = React.lazy(() =>
	import('./components/sign/activation-email')
);
const ChangePassword = React.lazy(() =>
	import('./components/sign/change-password')
);

//sh
const history = createBrowserHistory();

const routes = [
	{
		path: '/user',
		exact: false,
		component: User,
	},
	{
		path: '/admin',
		exact: true,
		component: Admin,
	},
	{
		path: '/upcoming',
		exact: true,
		component: OnDeveloping,
	},
	{
		path: '/404',
		exact: true,
		component: NotFound,
	},
	{
		path: '/activate/:activation_token',
		exact: false,
		component: ActivationEmail,
	},
	{
		path: '/reset/:reset_token',
		exact: false,
		component: ChangePassword,
	},
	{
		path: '*',
		exact: false,
		component: NotFound,
	},
];
class App extends Component {
	render() {
		return (
			<Router history={history}>
				<React.Suspense fallback={<div>Loading....</div>}>
					<Switch>
						<Route exact path="/">
							<Redirect to="/user" />
						</Route>
						{routes.map((route, i) => {
							return (
								<Route key={i} path={route.path} component={route.component} />
							);
						})}
					</Switch>
				</React.Suspense>
			</Router>
		);
	}
}

export default App;
