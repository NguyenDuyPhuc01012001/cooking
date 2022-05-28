import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
	Redirect,
} from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './user.css';
import { AnimatePresence } from 'framer-motion';
import Home from '../components/home/home';
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
