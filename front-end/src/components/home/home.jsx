import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Intro from './intro';
import Type from './type';
import Popular from './popular';
import { motion } from 'framer-motion';

import './home.css';
class Home extends Component {
	render() {
		return (
			<Fragment>
				<div>
					<Intro></Intro>
				</div>
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					transition={{ opacity: 0.5 }}
				>
					<Type />
					<Popular />
				</motion.div>
			</Fragment>
		);
	}
}

export default Home;
