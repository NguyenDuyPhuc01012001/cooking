import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/hot_and_types.css';
import './home.css';

function Category() {
	const [dataCategory, setDataCategory] = useState([]);

	const fetchData = () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/v1/categories/getAll`,
		})
			.then((res) => {
				const data = res.data;
				const newData = data.map((item, index) => {
					return {
						id: item._id,
						title: item.title,
						image: item.image,
						link: item.short_title + '?page=0',
					};
				});
				setDataCategory(newData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div class="light_background wrapper ">
			<motion.div
				className="body__container"
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				transition={{ opacity: 0.5 }}
			>
				<h3 className="type__title">Phân loại</h3>
				<Splide
					options={{
						perPage: 4,
						arrows: true,
						pagination: false,
						drag: 'free',
						gap: '5rem',
					}}
					className="type__list"
				>
					{dataCategory.map((type) => {
						return (
							<SplideSlide key={type.id}>
								<Link to={`/user/category/${type.link}`}>
									<div className="type__item">
										<img
											src={type.image}
											alt={type.title}
											className="type__item-img"
										/>
										<div className="type__item-info">
											<p className="type__item-name">{type.title}</p>
										</div>
									</div>
								</Link>
							</SplideSlide>
						);
					})}
				</Splide>
			</motion.div>
		</div>
	);
}

export default Category;
