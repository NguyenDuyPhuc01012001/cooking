import React, { useEffect, Fragment, useState, useRef } from 'react';
import ReactDOM, { render } from 'react-dom';
import { useForm, useFormContext } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import arrowDown from '../../../assets/image/arrow-down.svg';
import './basic-info.css';

const BasicInfo = ({ data, setBasicInfo, setFiles }) => {
	const {
		register,
		formState: { errors, isValidating },
		formState,

		setValue,
	} = useFormContext();

	const [fullName, setFullName] = useState('');
	const [birthday, setBirthDay] = useState();
	const [gender, setGender] = useState();
	const [preview, setPreview] = useState();
	const [email, setEmail] = useState('');
	useEffect(() => {
		setFullName(data.fullName);
		setBirthDay(data.birthday);
		setGender(data.gender);
		setEmail(data.email);
		setValue('fullName', data.fullName);
		setValue('birthday', data.birthday);
	}, [data]);
	function short(data) {
		const text = data + ' ';
		const length = text.length;
		return length < 30
			? text
			: text.slice(0, 25) + '...' + text.slice(length - 11, length);
	}

	return (
		<Fragment>
			{data && (
				<div className="basic-container">
					<div className="info-title">Thông tin cơ bản</div>

					<div className="avatar_container">
						<div className="image_user_container">
							{preview ? (
								<img src={URL.createObjectURL(preview)} alt="" />
							) : (
								<img src={data.image} alt="" />
							)}
						</div>
						<div className="image_info_container">
							<input
								type="file"
								id="upload"
								hidden
								accept="image/*"
								onChange={(event) => {
									const file = event.target.files[0];

									if (file && file.type.substr(0, 5) === 'image') {
										setFiles(event.target.files[0]);
										setPreview(event.target.files[0]);
									} else {
										setFiles(null);
										setPreview(null);
									}
								}}
							/>
							<label for="upload" className="upload_file">
								Tải ảnh lên
							</label>

							<div>Chỉ JPG, GIF hoặc PNG, lớn nhất là 10MB</div>
						</div>
					</div>

					<div className="select_container">
						<div basic-container>
							<p>
								Họ và Tên <span>*</span>
							</p>

							<div className="select__items">
								<input
									type="text"
									placeholder="Nhập họ và tên của bạn"
									value={fullName}
									className="input_items"
									maxLength="99"
									{...register('fullName')}
									onChange={(e) => {
										setBasicInfo(e);
									}}
								/>
							</div>
							<p className={errors.fullName?.message ? 'active' : 'non-active'}>
								{errors.fullName?.message}
							</p>
						</div>

						<div>
							<p>Ngày sinh</p>
							<div className="select__items">
								<input
									type="date"
									value={birthday}
									// min="1900-01-01"
									// max="2023-12-31"
									required
									className="input_items"
									{...register('birthday')}
									onChange={(e) => {
										setBasicInfo(e);
									}}
								/>
							</div>
						</div>
						<div>
							<p>
								Giới tính <span>*</span>
							</p>

							<div className="gender-select m-top-16">
								<label className="custom-radio-btn">
									<input
										value="Nam"
										checked={gender == 'Nam'}
										onChange={(e) => {
											setBasicInfo(e);
										}}
										type="radio"
										name="gender"
									/>
									<span className="checkmark"></span>
									<span className="label">Nam</span>
								</label>

								<label className="custom-radio-btn">
									<input
										value="Nữ"
										checked={gender == 'Nữ'}
										onChange={(e) => {
											setBasicInfo(e);
										}}
										type="radio"
										name="gender"
									/>
									<span className="checkmark"></span>
									<span className="label">Nữ</span>
								</label>
							</div>
						</div>

						<div>
							<p>Email </p>
							<h5>{short(email)}</h5>
						</div>
					</div>

					<div className="select_container"></div>
				</div>
			)}
		</Fragment>
	);
};
export default BasicInfo;
