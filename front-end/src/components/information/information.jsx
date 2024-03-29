import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import ActivityCarousel from './ActivityCarousel';
import Banner from './Banner';
import './information.css';
import Introduction from './Introduction';
import Slogan from './Slogan';

class Information extends Component {
	render() {
		return (
			<Fragment>
				<div>
					<Banner />
				</div>
				<div>
					<Introduction />
				</div>
				<div>
					<Slogan />
				</div>
				<div>
					<ActivityCarousel />
				</div>
				{/* <div>
                    <ImplementSection />
                </div>
                <div><SpecialNewsCarousel/></div> */}
			</Fragment>
		);
	}
}
/*
s
*/
export default Information;
