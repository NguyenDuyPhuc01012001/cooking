import React, { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useParams,
	useHistory,
} from 'react-router-dom';
import '../../home/main/main.css';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import banner1 from '../../assets/introduction_page/banner1.jpg';
import banner2 from '../../assets/introduction_page/banner2.jpg';
import banner3 from '../../assets/introduction_page/banner3.jpg';
const Intro = () => {
	//SEARCH HERE
	const [searchWords, setSearchWords] = useState('');
	const history = useHistory();
	const submitHandler = (e) => {
		e.preventDefault();
		if (searchWords.length == 0) searchWords = ' ';
		history.push('/user/searched/' + searchWords + '?page=0');
	};
	const Introform = (
		<div className="intro__form">
			<form action={submitHandler} className="text__search">
				<div className="intro__form__search">
					<input
						type="text"
						className="input__search"
						placeholder="Nhập món ăn, nguyên liệu"
						onChange={(e) => setSearchWords(e.target.value)}
						value={searchWords}
					/>
					<input type="submit" hidden />
					<button type="submit" className="btn__search" onClick={submitHandler}>
						<i className="fa fa-search"></i>Tìm kiếm
					</button>
				</div>
			</form>
		</div>
	);
	return (
		<Fragment>
			<div className="wrap__introduction">
				<div className="home-introduction-container">
					<div className="home-introduction-title">
						<span>Tìm kiếm công thức nấu ăn</span>
					</div>
					<div className="home-search-box">{Introform}</div>
					<OwlCarousel
						items={1}
						autoplay={true}
						autoplayTimeout={5000}
						loop
						dots={true}
						dotClass="home-dot"
						dotsClass="home-dot-container"
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
};

export default Intro;
