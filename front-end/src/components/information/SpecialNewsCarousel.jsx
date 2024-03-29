import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Fragment } from 'react/cjs/react.production.min';
import next from '../../assets/image/ReCarouselOwl/next.png';
import prev from '../../assets/image/ReCarouselOwl/prev.png';
import special1 from '../../assets/introduction_page/special1.png';
import special2 from '../../assets/introduction_page/special2.png';
import special3 from '../../assets/introduction_page/special3.png';
import SpecialCard from './SpecialCard';
import './SpecialNewsCarousel.css';
const prevIcon = `<img src=${prev} />`;
const nextIcon = `<img src=${next} />`;

const items = [
	{
		img: special1,
		title: 'Khu đô thị',
		content: 'Chung cư UIT Thành phố Thủ Đức',
		link: '/upcoming',
	},
	{
		img: special2,
		title: 'Khu đô thị',
		content: 'Chung cư UIT Thành phố Thủ Đức',
		link: '/upcoming',
	},
	{
		img: special3,
		title: 'Khu đô thị',
		content: 'Chung cư UIT Thành phố Thủ Đức',
		link: '/upcoming',
	},
];
export default function SpecialNewsCarousel() {
	return (
		<Fragment>
			<div className="special-section-container">
				<p className="info-section-title">Các tin tức đặc biệt</p>
				<div className="carousel-activity-container">
					<OwlCarousel
						items={3}
						margin={20}
						nav
						loop
						autoWidth
						navContainerClass="information-nav-container"
						navText={[prevIcon, nextIcon]}
						navClass={['re-prev-owl', 're-next-owl']}
						onClick={() => {}}
					>
						{items.map((item, index) => {
							return (
								<SpecialCard
									img={item.img}
									title={item.title}
									content={item.content}
									link={item.link}
								/>
							);
						})}
					</OwlCarousel>
					<a href="/upcoming" className="carousel-activity-see-all">
						Xem tất cả
					</a>
				</div>
			</div>
		</Fragment>
	);
}
