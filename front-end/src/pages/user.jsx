import React from 'react';
import {
	BrowserRouter as Router, Route, Switch, useLocation
} from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Home from '../components/home/home';
import './user.css';
const Category = React.lazy(() => import('../components/search/category'));
const Search = React.lazy(() => import('../components/search/search'));
const Tag = React.lazy(() => import('../components/search/tag'));
const All = React.lazy(() => import('../components/search/all'));
const Recipe = React.lazy(() => import('../components/recipe/recipe'));
const Post = React.lazy(() => import('../components/post/post-recipe'));
const Information = React.lazy(() =>
	import('../components/information/information.jsx')
);
const NotFound = React.lazy(() => import('../components/error/not-found'));
const routes = [
	{
		path: '/user/category/:type',
		exact: false,
		component: Category,
	},
	{
		path: '/user/recipe/:idRecipe',
		exact: false,
		component: Recipe,
	},
	{
		path: '/user/searched/:search',
		exact: false,
		component: Search,
	},
	{
		path: '/user/tag/:tag',
		exact: false,
		component: Tag,
	},
	{
		path: '/user/all/recipe',
		exact: true,
		component: All,
	},
	{
		path: '/user/information',
		exact: true,
		component: Information,
	},
	{
		path: '/user/create/recipe',
		exact: true,
		component: Post,
	},
	{
		path: '/user/*',
		exact: true,
		component: NotFound,
	},
	{
		path: '/user',
		exact: true,
		component: Home,
	},
];

function User() {
	const location = useLocation();
	return (
		<Fragment>
			<Router>
				<Header> </Header>
				<Switch Location={location} key={location.pathname}>
					{routes.map((route, i) => {
						return (
							<Route key={i} path={route.path} component={route.component} />
						);
					})}
				</Switch>
				<Footer> </Footer>
			</Router>
		</Fragment>
	);
}
export default User;
