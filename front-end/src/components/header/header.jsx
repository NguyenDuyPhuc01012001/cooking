import React, { Component, useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './header.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/user_page/logo.svg';
import global from '../../assets/user_page/global.png';
import Popup from 'reactjs-popup';
//#region Popup
import SignIn from '../sign/sign-in';
import ForgotPassword from '../sign/forgot-password';
import SignUp from '../sign/sign-up';
import ConfirmEmail from '../sign/confirm-email';
import UpdateInformation from '../sign/change-email';
//#endregion
import Dropdown from '../main-admin/dropdown/Dropdown';
import user_image from '../../assets/avatar.jpg';
import ic_logout from '../../assets/ic_logout.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';

var posX = window.innerWidth;
window.onresize = () => {
	posX = window.innerWidth;
};

const newsLink = '/user/news';
const informationLink = '/user/information';
const contractAddressLink = '/upcoming';

let navbarItems = [
	{
		displayName: 'Tin tức',
		link: newsLink,
		dropDownItems: [
			{
				displayName: 'BĐS & Covid-19',
				link: '/upcoming',
			},
			{
				displayName: 'Thị trường',
				link: '/upcoming',
			},
			{
				displayName: 'Thông tin quy hoạch',
				link: '/upcoming',
			},
			{
				displayName: 'Bất động sản thế giới',
				link: '/upcoming',
			},
		],
	},
	{
		displayName: 'Thông tin',
		link: informationLink,
		dropDownItems: [],
	},
	{
		displayName: 'Liên hệ',
		link: contractAddressLink,
		dropDownItems: [],
	},
];

const user_menu = [
	{
		content: 'Quản lý tin đăng',
		icon: 'fas fa-angle-right angle-left',
		link: '/admin/posts',
	},
	{
		content: 'Quản lý tài khoản',
		icon: 'fas fa-angle-right angle-left',
		link: '/admin/profile',
	},
	{
		content: 'Thay đổi mật khẩu',
		icon: 'fas fa-angle-right angle-left',
		link: '/admin/password',
	},
];
const renderNoFooter = () => <div className="no-footer"></div>;

const renderUserToggle = (name, image) => {
	return (
		<li className="topnav__right-user">
			<div className="topnav__right-user__li">
				<div className="topnav__right-user__image">
					<img src={image} alt="" />
				</div>
			</div>
			<div>
				<div className="topnav__right-user__name">{name}</div>
			</div>
			<div>
				<i className="fas fa-angle-down margin8"></i>
			</div>
		</li>
	);
};

const renderUserMenu = (item, index) => (
	<div key={index}>
		<a href={item.link}>
			<div className="user-menu">
				<span className="user-menu__item">{item.content}</span>
				<i className={item.icon}></i>
			</div>
		</a>
	</div>
);

function Header() {
	const [isShowSignIn, setIsShowSignIn] = useState(false);
	const [isShowConfirm, setIsShowConfirm] = useState(false);
	const [isShowForgot, setIsShowForgot] = useState(false);
	const [isShowChangeEmail, setIsShowChangeEmail] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [headerEmail, setHeaderEmail] = useState();
	const [name, setName] = useState('Name');
	const [image, setImage] = useState(user_image);
	const [userID, setUserID] = useState();

	const dispatch = useDispatch();

	const loginHandle = () => {
		setIsLogin(true);
		window.location.reload();
	};
	//flag
	const handleCloseForgot = () => {
		setIsShowForgot(false);
	};
	const handleSignIn = () => {
		setIsShowSignIn(true);
		setIsShowConfirm(false);
		setIsShowForgot(false);
		setIsShowChangeEmail(false);
	};

	const handleConfirm = () => {
		setIsShowConfirm(true);
		setIsShowSignIn(false);
		setIsShowForgot(false);
	};
	const handleForgot = () => {
		setIsShowForgot(true);
		setIsShowSignIn(false);
	};
	const handleLogout = () => {
		setIsShowConfirm(false);
		setIsShowSignIn(false);
		setIsLogin(false);
		Cookies.remove('bearerToken');
		Cookies.remove('token');
		const Token = Cookies.get('token');
		window.location.reload();
	};
	const handleUpdateConfirmation = () => {
		setIsShowConfirm(false);
		setIsShowChangeEmail(true);
	};
	const halndleLogin = () => {
		setIsLogin(true);
	};
	const handleSignInClose = () => {
		setIsShowSignIn(false);
	};
	const handleChangeEmailClose = () => {
		setIsShowChangeEmail(false);
		setIsShowConfirm(true);
	};
	const checkLogin = async () => {
		const Token = Cookies.get('token');
		if (!!Token) {
			var j = JSON.parse(atob(Token.split('.')[1]));
			setIsLogin(true);
			await getUserData(j['id']);
		} else {
			setIsLogin(false);
		}
	};

	const getUserData = async (id) => {
		await axios
			.get(`${process.env.REACT_APP_API_URL}/api/v1/user/profile/` + id)
			.then((res) => {
				const data = res.data;
				setUserID(id);
				setName(data.fullName);
				setImage(data.image);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		checkLogin();
	}, []);
	return (
		<Fragment>
			<div className="header-container">
				<ul className="header-col">
					<li className="logo-container">
						<Link to="/user">
							<img src={logo} alt="logo" className="logo" />
						</Link>
					</li>
					{navbarItems.map((item, index) => {
						return (
							<li className="header-navbar" key={index}>
								<a
									exact
									href={item.link}
									activeClassName="active"
									className="navbar-link"
								>
									{item.displayName}
								</a>
								<div className="line"></div>
								<ul className="navbar-hover-list">
									{item.dropDownItems.map((item, index) => {
										return (
											<li key={index} className="drop-list-item">
												<a className="drop-link" href={item.link}>
													{item.displayName}
												</a>
											</li>
										);
									})}
								</ul>
							</li>
						);
					})}
				</ul>

				{!isLogin ? (
					<ul className="header-col">
						<li>
							<a href="/upcoming">
								<img src={global} alt="global" />
							</a>
						</li>
						<li className="header-navbar login">
							<button onClick={handleSignIn} className="navbar-link">
								Đăng nhập
							</button>
							<Popup
								open={isShowSignIn}
								onClose={() => setIsShowSignIn(false)}
								modal
								nested
								closeOnDocumentClick={false}
							>
								{
									<SignIn
										setIsShowSignIn={handleSignInClose}
										setIsLogin={loginHandle}
										handleForgotOpen={handleForgot}
									/>
								}
							</Popup>
							<div className="line"></div>
						</li>
						<li>
							<Popup open={isShowConfirm} closeOnDocumentClick={false}>
								{
									<ConfirmEmail
										setIsLogin={setIsLogin}
										handleShowUpdateInformation={handleUpdateConfirmation}
										email={headerEmail}
									/>
								}
							</Popup>

							<Popup
								closeOnDocumentClick={false}
								onClose={() => setIsShowForgot(false)}
								open={isShowForgot}
							>
								{
									<ForgotPassword
										setIsLogin={setIsLogin}
										handleClose={handleCloseForgot}
										headerEmail={headerEmail}
										handleConfirm={handleConfirm}
										handleOpenSignIn={handleSignIn}
									/>
								}
							</Popup>

							<Popup
								closeOnDocumentClick={false}
								open={isShowChangeEmail}
								onClose={handleChangeEmailClose}
							>
								{
									<UpdateInformation
										headerEmail={headerEmail}
										setHeaderEmail={setHeaderEmail}
										handleConfirm={handleConfirm}
										handleClose={handleChangeEmailClose}
									/>
								}
							</Popup>
						</li>
					</ul>
				) : (
					<ul className="header-col-right">
						{/* <button onClick={DelLikedItem} className="register-btn">Test Del and Update</button> */}
						<div className="topnav__right-item">
							{!!name && !!image && (
								<li>
									<Dropdown
										contentStyle="dropdown__content"
										customToggle={() => renderUserToggle(name, image)}
										contentData={user_menu}
										renderItems={(item, index) => renderUserMenu(item, index)}
										renderFooter={() => (
											<a href="/user">
												<hr width="100%" />
												<button onClick={handleLogout} className="footer_btn">
													Đăng xuất
													<img src={ic_logout} alt="" className="ic-logout" />
												</button>
											</a>
										)}
									/>
								</li>
							)}
						</div>
						<hr width="100%" />
						<Link to="/user/create/recipe">
							<button className="post-btn">Đăng bài</button>
						</Link>
					</ul>
				)}
			</div>
		</Fragment>
	);
}

export default Header;
