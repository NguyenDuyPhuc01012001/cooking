import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link, useHistory } from 'react-router-dom';
import '../../assets/css/hot_and_types.css';
import './home.css';
function Popular() {
	const history = useHistory();
	const [popular, setPopular] = useState([]);
	useEffect(() => {
		getPopular();
	}, []);
	const getPopular = async () => {
		const check = localStorage.getItem('popular');
		if (check) {
			setPopular(JSON.parse(check));
		} else {
			const api = await fetch(
				`${process.env.REACT_APP_API_URL}/api/v1/recipe/random/9`
			);
			const data = await api.json();
			localStorage.setItem('popular', JSON.stringify(data));
			setPopular(data);
		}
	};
	const loadMore = () => {
		console.log('getIn');
		history.push('/user/all/recipe?page=0');
	};
	return (
		<div class="wrapper white_background">
			<div className="body__container ">
				<h3 className="item__title">Phổ biến</h3>
				<Grid className="type__list">
					{popular.map((recipe) => {
						return (
							<div key={recipe._id}>
								<Card>
									<Link to={'/user/recipe/' + recipe._id}>
										<p>{recipe.title}</p>
										<img
											src={recipe.pictures.length > 0 ? recipe.pictures[0] : ''}
											alt={recipe.title}
										></img>
										<Gradient />
									</Link>
								</Card>
							</div>
						);
					})}
				</Grid>
				<div className="morebutton">
					<button className="button" onClick={() => loadMore()}>
						Xem thêm
					</button>
				</div>
			</div>
		</div>
	);
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(1rem, 15rem));
	grid-gap: 3rem;
	justify-content: center;
`;
const Card = styled.div`
	min-height: 20rem;
	overflow: hidden;
	position: relative;
	border-radius: 2rem;
	img {
		border-radius: 2rem;
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	p {
		position: absolute;
		z-index: 10;
		left: 50%;
		bottom: 0%;
		transform: translate(-50%, 0%);
		color: #fff;
		width: 100%;
		text-align: center;
		font-weight: 600;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;
export default Popular;
