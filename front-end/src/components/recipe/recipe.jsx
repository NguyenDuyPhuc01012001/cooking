import ReactToPrint from 'react-to-print';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import axios from 'axios';
import './recipe.css';

function Recipe() {
	const componentRef = React.useRef(null);

	const onBeforeGetContentResolve = React.useRef(null);

	const [loading, setLoading] = React.useState(false);
	const [text, setText] = React.useState('old boring text');

	const handleAfterPrint = React.useCallback(() => {
		console.log('`onAfterPrint` called');
	}, []);

	const handleBeforePrint = React.useCallback(() => {
		console.log('`onBeforePrint` called');
	}, []);

	const handleOnBeforeGetContent = React.useCallback(() => {
		console.log('`onBeforeGetContent` called');
		setLoading(true);
		setText('Loading new text...');

		return new Promise((resolve) => {
			onBeforeGetContentResolve.current = resolve;

			setTimeout(() => {
				setLoading(false);
				setText('New, Updated Text!');
				resolve();
			}, 2000);
		});
	}, [setLoading, setText]);

	React.useEffect(() => {
		if (
			text === 'New, Updated Text!' &&
			typeof onBeforeGetContentResolve.current === 'function'
		) {
			onBeforeGetContentResolve.current();
		}
	}, [onBeforeGetContentResolve.current, text]);

	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, [componentRef.current]);

	const reactToPrintTrigger = React.useCallback(() => {
		// NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
		// to the root node of the returned component as it will be overwritten.

		// Bad: the `onClick` here will be overwritten by `react-to-print`
		// return <button onClick={() => alert('This will not work')}>Print this out!</button>;

		// Good
		return <i class="fas fa-print"></i>; // eslint-disable-line max-len
	}, []);
	const [details, setDetails] = useState([]);
	const [pictureURL, setPictureURL] = useState('');
	const [activeTab, setActiveTab] = useState('instruction');
	let params = useParams();
	const history = useHistory();
	const fetchDetails = (idRecipe) => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/v1/recipe/${idRecipe}`,
		})
			.then((res) => {
				const data = res.data;
				if (data[0].pictures.length != 0) setPictureURL(data[0].pictures[0]);

				setDetails(data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchDetails(params.idRecipe);
	}, [params.idRecipe]);
	const clickHandler = (tag) => {
		history.push('/user/tag/' + tag + '?page=0');
	};
	const isOnlyNumber = (time) => {
		const re = /^[0-9\b]+$/;

		if (time === '' || re.test(time)) {
			return time + ' phút';
		} else return time;
	};

	return (
		<div>
			<div ref={componentRef} className="detail_wrapper">
				<div className="body__container">
					<section class="recipe-hero">
						<img
							class="recipe-hero-img img"
							src={pictureURL}
							alt={details.title}
						></img>
						<article class="recipe-info">
							<h2>{details.title}</h2>
							<p>{details.description}</p>
							<div class="recipe-icons">
								<article>
									<i class="fas fa-clock"></i>
									<h5>Chuẩn bị</h5>
									<p>{isOnlyNumber(details.prepTime)}</p>
								</article>
								<article>
									<i class="far fa-clock"></i>
									<h5>Nấu</h5>
									<p>{isOnlyNumber(details.cookTime)}</p>
								</article>
								<article>
									<i class="fas fa-user-friends"></i>
									<h5>Phục vụ</h5>
									<p>{details.people} người</p>
								</article>
							</div>
							<div className="more_func">
								<p class="recipe-tags">
									Thẻ :
									{details == undefined ||
									details == null ||
									details.length == 0 ? (
										<div></div>
									) : (
										details.tags.map((item, index) => (
											<button onClick={() => clickHandler(item.tag)}>
												{item.tag}
											</button>
										))
									)}
								</p>
								<div className="print_btn">
									<ReactToPrint
										content={reactToPrintContent}
										documentTitle="Tasty"
										onAfterPrint={handleAfterPrint}
										onBeforeGetContent={handleOnBeforeGetContent}
										onBeforePrint={handleBeforePrint}
										removeAfterPrint
										trigger={reactToPrintTrigger}
									/>
								</div>
							</div>
						</article>
					</section>
					<section class="recipe-content">
						<article class="second-column">
							<div>
								<h4>Nguyên liệu</h4>
								<div>
									{details == undefined ||
									details == null ||
									details.length == 0 ? (
										<div></div>
									) : (
										details.ingredients.map((item, index) => (
											<p className="single-ingredient" key={index}>
												{item}
											</p>
										))
									)}
								</div>
							</div>
							{/* <div>
								<h4>tools</h4>
								<p class="single-tool">Hand Blender</p>
								<p class="single-tool">Large Heavy Pot With Lid</p>
								<p class="single-tool">Measuring Spoons</p>
								<p class="single-tool">Measuring Cups</p>
							</div> */}
						</article>
						<article className="first-column">
							<h4>Hướng dẫn</h4>
							{/* <!-- single instruction --> */}
							<div class="single-instruction">
								<div>
									{details == undefined ||
									details == null ||
									details.length == 0 ? (
										<div></div>
									) : (
										details.instructions.map((item, index) => (
											<div>
												<header>
													<p>Bước {index + 1}</p>
													<div></div>
												</header>
												<p key={index}>{item}</p>
											</div>
										))
									)}
								</div>
							</div>
							{/* <!-- end of single instruction --> */}
						</article>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Recipe;
