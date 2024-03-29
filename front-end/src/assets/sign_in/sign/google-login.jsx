import React, { Component, Fragment } from 'react';
import googleLogin from '../../assets/sign_in/google_logo.png';
import { Link } from 'react-router-dom';

function GoogleLoginUI() {
	return (
		<Fragment>
			<button className="social-sign-in m-left-24">
				<div>
					<img className="social-logo google-logo" src={googleLogin} />
					<span className="social-name">Google</span>
				</div>
			</button>
		</Fragment>
	);
}
export default GoogleLoginUI;
