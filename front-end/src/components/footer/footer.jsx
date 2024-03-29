import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import certification from '../../assets/user_page/certification.png';
import facebook from '../../assets/user_page/facebook.png';
import instagram from '../../assets/user_page/instagram.png';
import location from '../../assets/user_page/location.png';
import phone from '../../assets/user_page/phone.png';
import twitter from '../../assets/user_page/twitter.png';
import './footer.css';

const connects = [
	{
		name: 'twitter',
		img: twitter,
		link: '/upcoming', //thêm link twitter ở đây
	},
	{
		name: 'facebook',
		img: facebook,
		link: '/upcoming', //thêm link fb ở đây
	},
	{
		name: 'instagram',
		img: instagram,
		link: '/upcoming', //thêm link insta ở đây
	},
];
const footerCols = [
	{
		title: 'Công ty',
		items: [
			{
				name: 'Về công ty',
				link: '/user/information',
			},
			{
				name: 'Quy chế hoạt động',
				link: '/upcoming',
			},
			{
				name: 'Liên hệ',
				link: '/upcoming',
			},
			{
				name: 'Sitemap',
				link: '/upcoming',
			},
		],
	},
	{
		title: 'Quy định',
		items: [
			{
				name: 'Điều khoản thỏa thuận',
				link: '/upcoming',
			},
			{
				name: 'Chính sách bảo mật',
				link: '/upcoming',
			},
			{
				name: 'Giải quyết thiếu nại',
				link: '/upcoming',
			},
			{
				name: 'Góp ý báo lỗi',
				link: '/upcoming',
			},
		],
	},
];
class Footer extends Component {
	render() {
		return (
			<Fragment>
				<div className="footer">
					<div className="footer-container">
						<div className="footer-center">
							{/* <div className="footer-logo-container">
								<Link to="/">
									<img src={logo} alt="logo" className="logo-footer" />
								</Link>
							</div> */}
							<div className="footer-info">
								<ul className="footer-column-first">
									<p className="footer-title">CÔNG TY CỔ PHẦN UIT VIỆT NAM</p>
									<li className="footer-item">
										<img
											src={location}
											className="footer-icon"
											alt="location"
										/>
										<span>
											Đường Hàn Thuyên Khu phố 6, Thành phố <br /> Thủ Đức,
											Thành phố Hồ Chí Minh
										</span>
									</li>
									<li className="footer-item">
										<img src={phone} className="footer-icon" alt="phone" />
										<span>Holine: 0909 009 090</span>
									</li>
									<li>
										<Link to="">
											<img src={certification} alt="logo1" />
										</Link>
									</li>
								</ul>
								{footerCols.map((item, index) => {
									return (
										<ul key={index}>
											<p className="footer-title">{item.title}</p>
											{item.items.map((item, index) => {
												return (
													<li className="footer-item" key={index}>
														<Link to={item.link}>{item.name}</Link>
													</li>
												);
											})}
										</ul>
									);
								})}

								<ul className="footer-col-last">
									<div>
										<p className="footer-title">Kết nối với chúng tôi</p>
										<ul className="connect">
											{connects.map((connect, index) => {
												return (
													<a
														href={connect.link}
														key={index}
														className="connect-item"
													>
														<img src={connect.img} alt="" />
													</a>
												);
											})}
										</ul>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="copyright">Copyright</div>
			</Fragment>
		);
	}
}
export default Footer;
