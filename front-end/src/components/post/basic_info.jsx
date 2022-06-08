import React, { useState, Fragment, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import axios from 'axios';
import arrowDown from '../../assets/image/arrow-down.svg';

import './basic_info.css';
import './post-recipe.css';

const BasicInfo = ({ basicInfo, setBasicInfo }) => {
	const {
		register,
		formState: { errors },
		getValues,
	} = useFormContext();
	const [countTitle, setCountTitle] = useState(99);
	const [dataCategory, setDataCategory] = useState([]);
	const { title, category, prepTime, cookTime, people, difficulty } = basicInfo;

	const handleChangeInput = (e) => {
		const re = /^[0-9\b]+$/; //rules
		if (e.target.value === '' || re.test(e.target.value)) {
			handleChangeInfo(e);
		}
	};

	const handleChangeInfo = async (e) => {
		setBasicInfo({
			...basicInfo,
			[e.target.name]: e.target.value,
		});
		console.log(e.target.name);
		console.log(e.target.value);
	};
	const fetchCategory = () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/v1/categories/getAll`,
		})
			.then((res) => {
				const data = res.data;
				console.log(data);
				const newData = data.map((item, index) => {
					return {
						stt: index + 1, // stt start = 1
						id: item._id,
						title: item.title,
						image: item.image,
						short_title: item.short_title,
					};
				});
				setDataCategory(newData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchCategory();
	}, [dataCategory.length]);
	return (
		<div className="info__container basic_info">
			<h3 className="info__title">THÔNG TIN CƠ BẢN</h3>
			<div className="info__form-group col-full">
				<label htmlFor="title" className="info__form-label">
					Tiêu đề <span className="text-red">*</span>
					<span className="count-key">{countTitle} </span>
				</label>

				<input
					className="info__form-input"
					id="title"
					name="title"
					type="text"
					maxLength="99"
					minLength="5"
					{...register('title')}
					placeholder="Nhập tiêu đề công thức của bạn. Tối thiểu là 5 ký tự và tối đa là 99 ký tự."
					value={title}
					onChange={(e) => {
						handleChangeInfo(e);
						setCountTitle(99 - e.target.value.length);
					}}
				/>

				<p className={errors.title?.message ? 'active' : 'non-active'}>
					{errors.title?.message}
				</p>
			</div>
			<div className="info__form-content">
				<div className="col-half-balance ">
					<div className="info__form-group">
						<label htmlFor="category" className="info__form-label">
							Phân loại <span className="text-red">*</span>
						</label>
						<div className="select__items">
							<select
								className="info__form-input"
								name="category"
								{...register('category')}
								onChange={handleChangeInfo}
							>
								<option value="">Vui lòng chọn phân loại</option>
								{dataCategory.map((option) => (
									<option key={option.id} value={option.short_title}>
										{option.short_title}
									</option>
								))}
							</select>
							<img className="icon_down" src={arrowDown} alt="arrowDown" />
						</div>
						<p className={errors.category?.message ? 'active' : 'non-active'}>
							{errors.category?.message}
						</p>
					</div>
					<div className="info__form-group">
						<label htmlFor="prepTime" className="info__form-label">
							Thời gian chuẩn bị (phút)
						</label>
						<input
							className="info__form-input"
							id="prepTime"
							name="prepTime"
							required
							type="number"
							placeholder="Nhập thời gian chuẩn bị"
							value={prepTime}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="info__form-group">
						<label htmlFor="people" className="info__form-label">
							Số người phục vụ
						</label>
						<input
							className="info__form-input"
							id="people"
							name="people"
							type="number"
							required
							placeholder="Nhập số lượng người có thể phục vụ"
							value={people}
							onChange={handleChangeInput}
						/>
					</div>

					<div className="info__form-group">
						<label htmlFor="cookTime" className="info__form-label">
							Thời gian nấu (phút)
						</label>
						<input
							className="info__form-input"
							id="cookTime"
							name="cookTime"
							type="number"
							required
							placeholder="Nhập thời gian nấu"
							value={cookTime}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="info__form-group">
						<label htmlFor="category" className="info__form-label">
							Độ khó <span className="text-red">*</span>
						</label>
						<div className="select__items">
							<select
								className="info__form-input"
								placeholder="Chọn độ khó"
								name="difficulty"
								{...register('difficulty')}
								onChange={handleChangeInfo}
							>
								<option value="">Vui lòng chọn độ khó</option>
								<option value="Dễ">Dễ</option>
								<option value="Trung bình">Trung bình</option>
								<option value="Khó">Khó</option>
							</select>
							<img className="icon_down" src={arrowDown} alt="arrowDown" />
						</div>
						<p className={errors.difficulty?.message ? 'active' : 'non-active'}>
							{errors.difficulty?.message}
						</p>
					</div>
				</div>
			</div>

			<div className="info__form-big-content">
				<div className="info__form-content"></div>
			</div>
		</div>
	);
};

export default BasicInfo;
