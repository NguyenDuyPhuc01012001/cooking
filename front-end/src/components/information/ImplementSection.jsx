import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Fragment } from 'react/cjs/react.production.min';
import next from '../../assets/image/ReCarouselOwl/next.png';
import prev from '../../assets/image/ReCarouselOwl/prev.png';
import implementBackground from '../../assets/introduction_page/implementBackground.png';
import ImplementCard from './ImplementCard';
import './ImplementSection.css';
const prevIcon = `<img src=${prev} />`;
const nextIcon = `<img src=${next} />`;
export default function ImplementSection() {
	return (
		<Fragment>
			<div className="implement-section-container">
				<div className="implement-absolute">
					<p className="info-section-title">Dự án đang triển khai</p>
					<div className="carousel-activity-container">
						<OwlCarousel
							items={3}
							margin={20}
							nav
							loop
							autoWidth
							dots={true}
							dotClass="implement-dot"
							dotsClass="implement-dot-container"
							navContainerClass="information-nav-container"
							navText={[prevIcon, nextIcon]}
							navClass={['re-prev-owl', 're-next-owl']}
							onClick={() => {}}
						>
							<ImplementCard />
							<ImplementCard />
							<ImplementCard />
						</OwlCarousel>
						<a href="/upcoming" className="carousel-activity-see-all">
							Xem tất cả
						</a>
					</div>
				</div>
				<img src={implementBackground} className="implement-img-background" />
			</div>
		</Fragment>
	);
}
