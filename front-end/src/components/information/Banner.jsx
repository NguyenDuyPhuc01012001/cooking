import React from 'react';
import './Banner.css';
import { Fragment } from 'react/cjs/react.production.min';
import prev from '../../assets/introduction_page/arrow-left.png';
import next from '../../assets/introduction_page/arrow-right.png';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import banner1 from '../../assets/introduction_page/banner1.jpg';
import banner2 from '../../assets/introduction_page/banner2.jpg';
import banner3 from '../../assets/introduction_page/banner3.jpg';
import downBtn from '../../assets/introduction_page/downBtn.png';
import FormRegister from './FormRegister';

const prevIcon = `<img src=${prev} />`;
const nextIcon = `<img src=${next} />`;

export default function Banner() {
	return (
		<Fragment>
			<div className="banner-container">
				<div className="banner-carousel-container">
					<div className="banner-title">
						<span>Tìm kiếm công thức nấu ăn</span>
					</div>
					<div className="banner-btn-down">
						<img src={downBtn} />
					</div>
					<div className="banner-form-regis">
						<FormRegister />
					</div>
					<OwlCarousel
						items={1}
						nav
						loop
						dots={true}
						navContainerClass="banner-nav-container"
						dotClass="banner-dot"
						dotsClass="banner-dot-container"
						navText={[prevIcon, nextIcon]}
						navClass={['banner-prev-owl', 'banner-next-owl']}
						onClick={() => {}}
					>
						<div className="banner-content">
							<img src={banner1} />
						</div>
						<div className="banner-content">
							<img src={banner2} />
						</div>
						<div className="banner-content">
							<img src={banner3} />
						</div>
					</OwlCarousel>
				</div>
			</div>
		</Fragment>
	);
}
