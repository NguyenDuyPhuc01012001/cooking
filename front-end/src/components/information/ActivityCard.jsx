import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './ActivityCard.css';
export default function ActivityCard(props) {
	return (
		<Fragment>
			<a
				href={props.link}
				className="activity-card-container"
				style={{ background: `url(${props.img})` }}
			>
				<div className="activity-card-content">
					<h className="activity-card-title">{props.title}</h>
					<p className="activity-card-p">{props.content}</p>
				</div>
			</a>
		</Fragment>
	);
}
