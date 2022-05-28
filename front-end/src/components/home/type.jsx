import React, { Component } from 'react';

import chien from '../../assets/type/chien.jpg';
import xao from '../../assets/type/xao.jpg';
import kho from '../../assets/type/kho.jpg';
import nuong from '../../assets/type/nuong.jpg';
import banh from '../../assets/type/banh.jpg';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@splidejs/splide/dist/css/splide.min.css';
import '../../assets/css/hot_and_types.css';
import './home.css';

function Hot() {
	const listType = [
		{
			id: 'chien',
			title: 'Món chiên',
			image: chien,
			link: '/chiên?page=0',
		},
		{
			id: 'xao',
			title: 'Món xào',
			image: xao,
			link: '/xào?page=0',
		},
		{
			id: 'kho',
			title: 'Món kho',
			image: kho,
			link: '/kho?page=0',
		},
		{
			id: 'nuong',
			title: 'Món nướng',
			image: nuong,
			link: '/nướng?page=0',
		},
		{
			id: 'banh',
			title: 'làm bánh',
			image: banh,
			link: '/',
		},
	];
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
					{listType.map((type) => {
						return (
							<SplideSlide key={type.id}>
								<Link to={`/user/category${type.link}`}>
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

export default Hot;
