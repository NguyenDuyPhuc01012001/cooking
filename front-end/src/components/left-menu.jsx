import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import b_home from '../assets/admin_LeftMenu/b_home.png';
import b_log_out from '../assets/admin_LeftMenu/b_log_out.png';
import home from '../assets/admin_LeftMenu/home.png';
import log_out from '../assets/admin_LeftMenu/log_out.png';
import logo from '../assets/user_page/logo.svg';
import './left-menu.css';

var name;

class MenuBtn extends React.Component {
	constructor(props) {
		super(props);

		// Set initial state
		this.state = {
			img: this.props.icon,
			clicked: false,
			paddingLeft: 0,
		};

		// Binding this keyword. COMPULSORY!!
		this.handleHover = this.handleHover.bind(this);
		this.handleNormal = this.handleNormal.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleHover() {
		if (!this.state.clicked)
			this.setState({
				img: this.props.hover,
				paddingLeft: 22,
				color: '#3eadcf',
			});
	}
	handleNormal() {
		if (!this.state.clicked) {
			this.setState({
				img: this.props.icon,
				paddingLeft: 0,
				color: '#000000',
			});
		}
	}
	handleFocus() {
		this.setState({
			img: this.props.focus,
			paddingLeft: 0,
			// backgroundColor: "#3eadcf",
			color: '#fff',
			clicked: true,
		});
	}
	handleBlur() {
		this.setState({
			img: this.props.icon,
			backgroundColor: '#fff',
			color: '#000000',
			clicked: false,
		});
	}

	render() {
		const styles = {
			contentStyle: {
				paddingLeft: this.state.paddingLeft,
				color: this.state.color,
			},
		};
		const { contentStyle } = styles;
		return (
			<Fragment>
				<div className="menu--btn chosen">
					<div className="content flex_left">
						<div className="icon">
							<img src={this.props.focus} alt="" />
						</div>
						<span className="">{this.props.name}</span>
					</div>
				</div>
				<NavLink
					exact
					to={this.props.link}
					activeStyle={{
						display: 'none',
					}}
					onMouseEnter={this.handleHover}
					onMouseLeave={this.handleNormal}
					className="menu--btn hover-effect"
					style={contentStyle}
				>
					<div className="content flex_left">
						<div className="icon">
							<img src={this.state.img} alt="" />
						</div>
						<p className="left-menu-subtitle">{this.props.name}</p>
					</div>
				</NavLink>
			</Fragment>
		);
	}
}

function Section(content) {
	return (
		<Fragment>
			<div className="section">
				<p className="title">{content.title}</p>
				<ul className="buttons">
					{content.option.map((item, index) => {
						return (
							<li key={index} onClick={() => (name = item.name)}>
								<MenuBtn
									name={item.name}
									icon={item.icon}
									hover={item.hover}
									focus={item.focus}
									link={item.link}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</Fragment>
	);
}

// Left menu mới dựa trên cái cũ.
// đổi class -> function
// loại bỏ vài code thừa.
const LeftMenu = ({ section }) => {
	const [icon, setIcon] = useState(home);
	const [iconOut, setIconOut] = useState(log_out);

	const handleHoverHome = () => {
		setIcon(b_home);
	};
	const handleNormalHome = () => {
		setIcon(home);
	};
	const handleHoverOut = () => {
		setIconOut(b_log_out);
	};
	const handleNormalOut = () => {
		setIconOut(log_out);
	};
	const handleLogOut = () => {
		Cookies.remove('bearerToken');
		Cookies.remove('token');
		// Cookies.remove('userEmail');
		// Cookies.remove('userPassword');
		window.location.reload();
	};

	return (
		<Fragment>
			<div className="menu--container">
				<div className="logo flex_center ">
					<a href="/user">
						<img src={logo} alt="logo" className="menu--container-logo" />
					</a>
				</div>
				<div className="menu--content">
					<li
						className="leftmenu-home-container hover-effect"
						onMouseEnter={handleHoverHome}
						onMouseLeave={handleNormalHome}
					>
						<a href="/user" className="leftmenu-home-link">
							<div className="left-menu-home">
								<div className="leftmenu-home-icon">
									<img src={icon} alt="icon"></img>
								</div>
								<span>Trang chủ</span>
							</div>
						</a>
					</li>

					{section.map((item, index) => {
						return (
							<div>
								{!!item.flag ? (
									<div key={index}>
										<Section title={item.title} option={item.option} />
									</div>
								) : null}
							</div>
						);
					})}

					<li
						className="leftmenu-home-container hover-effect"
						onMouseEnter={handleHoverOut}
						onMouseLeave={handleNormalOut}
					>
						<a
							href="/user"
							className="leftmenu-home-link"
							onClick={handleLogOut}
						>
							<div className="left-menu-home">
								<div className="leftmenu-home-icon">
									<img src={iconOut} alt=""></img>
								</div>
								<span>Đăng xuất</span>
							</div>
						</a>
					</li>
				</div>
				<div className="icon_test"></div>
			</div>
		</Fragment>
	);
};

export default LeftMenu;
