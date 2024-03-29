import React from 'react';
import account from '../assets/admin_LeftMenu/account.png';
import b_account from '../assets/admin_LeftMenu/b_account.png';
import b_info from '../assets/admin_LeftMenu/b_info.png';
import b_lock from '../assets/admin_LeftMenu/b_lock.png';
import b_news from '../assets/admin_LeftMenu/b_news.png';
import b_person from '../assets/admin_LeftMenu/b_person.png';
import b_post from '../assets/admin_LeftMenu/b_post.png';
import b_setting from '../assets/admin_LeftMenu/b_setting.png';
import info from '../assets/admin_LeftMenu/info.png';
import lock from '../assets/admin_LeftMenu/lock.png';
import news from '../assets/admin_LeftMenu/news.png';
import person from '../assets/admin_LeftMenu/person.png';
import post from '../assets/admin_LeftMenu/post.png';
import setting from '../assets/admin_LeftMenu/setting.png';
import w_account from '../assets/admin_LeftMenu/w_account.png';
import w_info from '../assets/admin_LeftMenu/w_info.png';
import w_lock from '../assets/admin_LeftMenu/w_lock.png';
import w_news from '../assets/admin_LeftMenu/w_news.png';
import w_person from '../assets/admin_LeftMenu/w_person.png';
import w_post from '../assets/admin_LeftMenu/w_post.png';
import w_setting from '../assets/admin_LeftMenu/w_setting.png';
import NotFoundAdmin from './error/not-found-admin';
import OnDevelopingAdmin from './error/on-developing-admin';
const Content = React.lazy(() => import('./main-admin/content.jsx'));
const Accounts = React.lazy(() => import('./main-admin/accounts.jsx'));
const CreateAccount = React.lazy(() => import('./main-admin/createAcc.jsx'));
const Posts = React.lazy(() => import('./main-admin/posts.jsx'));
const Categories = React.lazy(() => import('./main-admin/categories.jsx'));
const News = React.lazy(() => import('./main-admin/news.jsx'));
const Information = React.lazy(() => import('./main-admin/information.jsx'));
const Profile = React.lazy(() => import('./main-admin/profile/profile.jsx'));
const Password = React.lazy(() => import('./main-admin/password.jsx'));

const Setting = React.lazy(() => import('./main-admin/setting.jsx'));

const userService = [
	{
		name: 'Quản lý bài đăng',
		icon: post,
		hover: b_post,
		focus: w_post,
		link: '/admin/posts',
		Component: Posts,
	},
	{
		name: 'Quản lý loại',
		icon: news,
		hover: b_news,
		focus: w_news,
		link: '/admin/categories',
		Component: Categories,
	},
];

const adminService = [
	...userService,
	{
		name: 'Quản lý tài khoản',
		icon: account,
		hover: b_account,
		focus: w_account,
		link: '/admin/accounts',
		Component: Accounts,
	},
	{
		name: 'Tạo tài khoản',
		icon: account,
		hover: b_account,
		focus: w_account,
		link: '/admin/create',
		Component: CreateAccount,
	},
	// {
	// 	name: 'Quản lý tin tức',
	// 	icon: news,
	// 	hover: b_news,
	// 	focus: w_news,
	// 	link: '/admin/news',
	// 	Component: Categories,
	// },
	{
		name: 'Quản lý thông tin',
		icon: info,
		hover: b_info,
		focus: w_info,
		link: '/admin/information',
		Component: Information,
	},
];

const sectionContent = [
	{
		flag: true,
		title: 'QUẢN LÝ DỊCH VỤ',
		option: userService,
	},
	{
		flag: true,
		title: 'QUẢN LÝ NGƯỜI DÙNG',
		option: [
			{
				name: 'Thông tin cá nhân',
				icon: person,
				hover: b_person,
				focus: w_person,
				link: '/admin/profile',
				Component: Profile,
			},
			{
				name: 'Đổi mật khẩu',
				icon: lock,
				hover: b_lock,
				focus: w_lock,
				link: '/admin/password',
				Component: Password,
			},
		],
	},
	{
		flag: true,
		title: 'CÀI ĐẶT',
		option: [
			{
				name: 'Cài đặt',
				icon: setting,
				hover: b_setting,
				focus: w_setting,
				link: '/admin/setting',
				Component: OnDevelopingAdmin,
			},
		],
	},
	{
		flag: false,
		title: 'Not Found',
		option: [
			{
				name: 'Not Found',
				link: '/admin/*',
				Component: NotFoundAdmin,
			},
		],
	},
];

export { userService, adminService, sectionContent };
