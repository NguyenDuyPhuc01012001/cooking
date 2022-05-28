import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import exit from '../../assets/sign_up/exit.png';
import eyeOn from '../../assets/sign_up/eye_on.png';
import eyeOff from '../../assets/sign_up/eye_off.png';
import Cookies from 'js-cookie';
import { checkValidEmail } from '../sign/valid-email';
import { checkValidPassword } from '../sign/valid-password';
import { checkValidName } from '../sign/valid-name';
import ConfirmEmail from '../sign/confirm-email';
import UpdateInformation from '../sign/change-email';
import './createAcc.css';
import Select from 'react-select';
import axios from 'axios';
import { showErrMsg } from '../sign/notification/notification';
import { Backdrop, CircularProgress } from '@material-ui/core';

import Popup from 'reactjs-popup';
const CreateAccount = () => {
	const customStyle = {
		dropdownIndicator: (base) => ({
			...base,
			color: 'rgba(0,0,0,1)',
			opacity: '0.96',
			'&:hover': {
				color: 'rgba(0,0,0,1)',
				opacity: '0.96',
			},
		}),
		control: (provided) => ({
			...provided,
			border: '1px solid #3eadcf',
			borderRadius: '10px',
			height: '56px',
			color: '#3eadcf',
		}),
	};
	const [passVisibility, setPassVisibility] = useState(eyeOff);
	const [rePassVisibility, setRePassVisibility] = useState(eyeOff);
	const [inputType, setInputType] = useState('password');
	const [reInputType, setReInputType] = useState('password');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [name, setName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [gender, setGender] = useState();
	const [isAgree, setIsAgree] = useState(false);
	const ref = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const [isTypeDate, setIsTypeDate] = useState(false);
	// checkValid
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidRePassword, setIsValidRePassword] = useState(true);
	const [isValidName, setIsValidName] = useState(true);
	const [isSetGender, setIsSetGender] = useState(true);
	const [isAgreeChecked, setIsAgreeChecked] = useState(true);
	// errorMessage
	const [emailError, setEmailError] = useState();
	const [passwordError, setPasswordError] = useState();
	const [rePasswordError, setRePasswordError] = useState();
	const [nameError, setNameError] = useState();
	const [isAgreeError, setIsAgreeError] = useState();
	const [genderError, setGenderError] = useState();
	const [error, setError] = useState('');
	const [isShowConfirm, setIsShowConfirm] = useState(false);
	const [isShowChangeEmail, setIsShowChangeEmail] = useState(false);

	function getEmailError(email) {
		let errorMessage = '';
		if (!checkValidEmail(email)) {
			errorMessage = email ? 'Email sai định dạng' : 'Email không được trống';
			setIsValidEmail(false);
			setEmailError(errorMessage);
		} else {
			setIsValidEmail(true);
		}
	}
	function getPasswordError(password) {
		let errorMessage = '';
		if (!checkValidPassword(password)) {
			errorMessage = password
				? 'Mật khẩu tối thiểu 6 ký tự bao gồm tối thiểu 1 ký tự in hoa và 1 chữ số'
				: 'Mật khẩu không được trống';
			setIsValidPassword(false);
			setPasswordError(errorMessage);
		} else {
			setIsValidPassword(true);
		}
	}
	function getRePasswordError(password, rePassword) {
		let errorMessage = '';
		if (rePassword == password && rePassword && password) {
			setIsValidRePassword(true);
			return;
		} else {
			setIsValidRePassword(false);
			if (!rePassword) {
				errorMessage = 'Nhập lại mật khẩu không được để trống';
			} else {
				errorMessage = 'Mật khẩu không khớp';
			}
			setRePasswordError(errorMessage);
			return;
		}
	}
	function getNameError(name) {
		let errorMessage = '';
		if (!checkValidName(name)) {
			errorMessage = name
				? 'Tên sai định dạng, chỉ bao gồm chữ cái hoặc khoảng trắng, độ dài từ 3 đến 50 ký tự'
				: 'Tên không được để trống';
			setIsValidName(false);
			setNameError(errorMessage);
		} else {
			setIsValidName(true);
		}
	}
	function getSetGenderError(gender) {
		let errorMessage = '';
		if (gender) {
			setIsSetGender(true);
		} else {
			errorMessage = 'Vui lòng chọn giới tính';
			setIsSetGender(false);
			setGenderError(errorMessage);
		}
	}
	function getIsAgreeError(isAgree) {
		let errorMessage = '';
		if (isAgree) {
			setIsAgreeChecked(true);
		} else {
			errorMessage = 'Bạn phải đồng ý điều khoản sử dụng để đăng ký';
			setIsAgreeChecked(false);
			setIsAgreeError(errorMessage);
		}
	}
	const handleCreateAccount = () => {
		setError('');
		getEmailError(email);
		getPasswordError(password);
		getRePasswordError(password, rePassword);
		getNameError(name);
		getSetGenderError(gender);
		getIsAgreeError(isAgree);

		if (
			checkValidEmail(email) &&
			checkValidPassword(password) &&
			checkValidName(name) &&
			isAgree &&
			rePassword &&
			password == rePassword &&
			gender
		) {
			setIsLoading(true);
			const image =
				'https://firebasestorage.googleapis.com/v0/b/book-store-app-3d8a6.appspot.com/o/none_avatar.jpg?alt=media&token=41662994-4635-45ef-ae01-0d929fbd8f91';
			if (birthday !== '')
				register(name, email, password, image, birthday, gender);
			else {
				const defaultBirthday = '2001/01/01';
				register(name, email, password, image, defaultBirthday, gender);
			}
		}
	};

	const handleConfirm = () => {
		setIsShowConfirm(true);
	};
	const handleUpdateConfirmation = () => {
		setIsShowConfirm(false);
		setIsShowChangeEmail(true);
	};
	const handleChangeEmailClose = () => {
		setIsShowChangeEmail(false);
		setIsShowConfirm(true);
	};

	const handleConfirmEmailClose = () => {
		setIsShowConfirm(false);
	};
	const register = (name, email, password, image, birthday, gender) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, {
				fullName: name,
				email: email,
				password: password,
				image: image,
				birthday: birthday,
				sex: gender,
			})
			.then((res) => {
				setIsLoading(false);
				handleConfirm();
			})
			.catch((err) => {
				setIsLoading(false);
				const code = err.message.substring(32, err.message.length);
				console.log(err);
				if (code == '401') {
					setEmail('');
					setError('Email này đã được đăng ký trước đó');
				} else {
					setError('Lỗi mạng không xác định');
				}
			});
	};

	const changePassVisibility = () => {
		if (passVisibility === eyeOn) {
			setPassVisibility(eyeOff);
			setInputType('password');
		}
		if (passVisibility === eyeOff) {
			setPassVisibility(eyeOn);
			setInputType('text');
		}
	};
	const changeRePassVisibility = () => {
		if (rePassVisibility === eyeOn) {
			setRePassVisibility(eyeOff);
			setReInputType('password');
		}
		if (rePassVisibility === eyeOff) {
			setRePassVisibility(eyeOn);
			setReInputType('text');
		}
	};

	return (
		<Fragment>
			<div className="create-container">
				<div className="header-sign-up">
					<span className="sign-up-title ">Tạo tài khoản</span>
				</div>
				{error && showErrMsg(error)}
				<div className="information-container  ">
					<div className="account-detail">Thông tin tài khoản</div>
					<div className="account-detail ">Thông tin cá nhân</div>
					<div>
						<div className={isValidEmail ? 'input-field' : 'invalid-input'}>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="input-sign-up required"
								type="text"
								required="required"
							></input>
							<div className="placeholder weight-400 size-16">
								Email <span className="require">*</span>
							</div>
						</div>
						{!isValidEmail && (
							<small className="sign-up-text-danger">{emailError}</small>
						)}
					</div>
					<div>
						<div className={isValidName ? 'input-field' : 'invalid-input'}>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="input-sign-up required"
								type="text"
								required="required"
							/>
							<div className="placeholder">
								Tên đầy đủ <span className="require">*</span>
							</div>
						</div>
						{!isValidName && (
							<small className="sign-up-text-danger">{nameError}</small>
						)}
					</div>
					<div>
						<div className={isValidPassword ? 'input-field' : 'invalid-input'}>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="input-sign-up required"
								type={inputType}
								required="required"
							/>
							<div className="placeholder">
								Mật khẩu <span className="require">*</span>
							</div>
							<button onClick={changePassVisibility} className="m-right-20">
								<img src={passVisibility} />
							</button>
						</div>

						{!isValidPassword && (
							<small className="sign-up-text-danger">{passwordError}</small>
						)}
					</div>

					<div>
						<div className="input-field  ">
							<input
								value={birthday}
								onChange={(e) => setBirthday(e.target.value)}
								className="input-sign-up required"
								type="text"
								required
								ref={ref}
								onFocus={() => {
									setIsTypeDate(true);
									ref.current.type = 'date';
								}}
								onBlur={() => {
									setIsTypeDate(false);
									ref.current.type = 'text';
								}}
							/>
							{!isTypeDate && <div className="placeholder">Ngày sinh</div>}
						</div>
					</div>
					<div>
						<div
							className={isValidRePassword ? 'input-field' : 'invalid-input'}
						>
							<input
								value={rePassword}
								onChange={(e) => setRePassword(e.target.value)}
								className="input-sign-up required"
								type={reInputType}
								required="required"
							/>
							<div className="placeholder">
								Nhập lại mật khẩu <span className="require">*</span>
							</div>
							<button onClick={changeRePassVisibility} className="m-right-20">
								<img src={rePassVisibility} />
							</button>
						</div>
						{!isValidRePassword && (
							<small className="sign-up-text-danger">{rePasswordError}</small>
						)}
					</div>
					<div>
						<div className="m-top-14">
							<div className="CompulsoryTitle">
								Giới tính <span className="require">*</span>
							</div>
							<div className="gender-select m-top-10">
								<label className="custom-radio-btn">
									<span className="label">Nam</span>
									<input
										value={'Nam'}
										checked={gender == 'Nam'}
										onChange={(e) => setGender(e.target.value)}
										type="radio"
										name="gender"
									/>
									<span className="checkmark"></span>
								</label>

								<label className="custom-radio-btn">
									<span className="label">Nữ</span>
									<input
										value={'Nữ'}
										checked={gender == 'Nữ'}
										onChange={(e) => setGender(e.target.value)}
										type="radio"
										name="gender"
									/>
									<span className="checkmark"></span>
								</label>
							</div>
						</div>
						{!isSetGender && (
							<small className="sign-up-text-danger">{genderError}</small>
						)}
					</div>
				</div>
				<div className="m-top-16 flex-form">
					<input
						checked={isAgree}
						type="checkbox"
						onClick={() => {
							setIsAgree(!isAgree);
						}}
					/>
					<label className="m-left-16 opacity-50 weight-400">
						Tôi đồng ý ...
					</label>
				</div>
				{!isAgreeChecked && (
					<small className="sign-up-text-danger">{isAgreeError}</small>
				)}
				<button onClick={handleCreateAccount} className="sign-up-btn m-top-16">
					Tạo tài khoản
				</button>

				<Backdrop sx={{ color: '#ffff', zIndex: 1000000 }} open={isLoading}>
					<CircularProgress color="primary" />
				</Backdrop>
				<Popup open={isShowConfirm} closeOnDocumentClick={false}>
					{
						<ConfirmEmail
							handleShowUpdateInformation={handleUpdateConfirmation}
							email={email}
							handleClose={handleConfirmEmailClose}
						/>
					}
				</Popup>

				<Popup
					closeOnDocumentClick={false}
					open={isShowChangeEmail}
					onClose={handleChangeEmailClose}
				>
					{
						<UpdateInformation
							headerEmail={email}
							setHeaderEmail={setEmail}
							handleConfirm={handleConfirm}
							handleClose={handleChangeEmailClose}
						/>
					}
				</Popup>
			</div>
		</Fragment>
	);
};

export default CreateAccount;
