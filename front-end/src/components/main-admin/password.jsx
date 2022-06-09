import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react/cjs/react.production.min';
import eyeOff from '../../assets/sign_up/eye_off.png';
import eyeOn from '../../assets/sign_up/eye_on.png';
import { checkValidPassword } from '../sign//valid-password';
import './password.css';

toast.configure();
const Password = () => {
	const history = useHistory();
	const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
	const [isShowNewPassword, setIsShowNewPassword] = useState(false);
	const [isShowReNewPassword, setIsShowReNewPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [reNewPassword, setReNewPassword] = useState('');
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidNewPassword, setIsValidNewPassword] = useState(true);
	const [isValidReNewPassword, setIsValidReNewPassword] = useState(true);
	const [passwordError, setPasswordError] = useState('');
	const [newPasswordError, setNewPasswordError] = useState('');
	const [rePasswordError, setRePasswordError] = useState('');
	let user;

	const handleSave = () => {
		validateCurrentPassword(currentPassword);
		validateNewPassword(newPassword);
		validateReNewPassword(newPassword, reNewPassword);
		if (
			checkValidPassword(newPassword) &&
			checkValidPassword(reNewPassword) &&
			checkValidPassword(currentPassword) &&
			currentPassword &&
			newPassword &&
			reNewPassword &&
			newPassword === reNewPassword
		) {
			changePassword(currentPassword, newPassword);
		}
	};

	const changePassword = (currentPassword, newPassword) => {
		const Token = Cookies.get('token');
		user = JSON.parse(atob(Token.split('.')[1]));
		axios
			.patch(
				`${process.env.REACT_APP_API_URL}/api/v1/user/changePassword/${user.id}`,
				{
					oldPassword: currentPassword,
					newPassword: newPassword,
				}
			)
			.then((res) => {
				toast.success('Đã thay đổi mật khẩu thành công', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setCurrentPassword('');
				setNewPassword('');
				setReNewPassword('');
			})
			.catch((err) => {
				const code = err.message.substring(32, err.message.length);
				if (code === '409') {
					toast.error(
						'Không trùng khớp mật khẩu hiện tại. Vui lòng kiểm tra lại',
						{
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				} else {
					toast.error('Lỗi mạng không xác định', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			});
	};
	const validateCurrentPassword = (password) => {
		if (!checkValidPassword(password)) {
			setIsValidPassword(false);
			if (!password) {
				setPasswordError('Mật khẩu không được để trống');
			} else {
				setPasswordError(
					'Mật khẩu tối thiểu 6 ký tự bao gồm tối thiểu 1 ký tự in hoa và 1 chữ số'
				);
			}
		} else {
			setIsValidPassword(true);
		}
	};
	const validateNewPassword = (newPassword) => {
		if (!checkValidPassword(newPassword)) {
			setIsValidNewPassword(false);
			if (!newPassword) {
				setNewPasswordError('Mật khẩu mới không được để trống');
			} else {
				setNewPasswordError(
					'Mật khẩu tối thiểu 6 ký tự bao gồm tối thiểu 1 ký tự in hoa và 1 chữ số'
				);
			}
		} else {
			setIsValidNewPassword(true);
		}
	};
	const validateReNewPassword = (newPassword, reNewPassword) => {
		if (!checkValidPassword(reNewPassword)) {
			setIsValidReNewPassword(false);
			if (!reNewPassword) {
				setRePasswordError('Nhập lại mật khẩu không được để trống');
			} else {
				setRePasswordError(
					'Mật khẩu tối thiểu 6 ký tự bao gồm tối thiểu 1 ký tự in hoa và 1 chữ số'
				);
			}
		} else {
			if (newPassword && reNewPassword && newPassword !== reNewPassword) {
				setIsValidReNewPassword(false);
				setRePasswordError('Mật khẩu không khớp');
			} else if (
				newPassword &&
				reNewPassword &&
				newPassword === reNewPassword
			) {
				setIsValidReNewPassword(true);
			}
		}
	};
	return (
		<Fragment>
			<div className="main-password-container">
				<div className="  password-input-container">
					<span className="password-title ">Mật khẩu hiện tại</span>

					<div
						className={
							isValidPassword ? 'input-password' : 'invalid-input-password'
						}
					>
						<input
							className="password-form-input"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							type={isShowCurrentPassword ? 'text' : 'password'}
							placeholder="Nhập mật khẩu hiện tại"
						/>
						<div className="separator"></div>
						<button
							className="change-password-btn"
							onClick={() => setIsShowCurrentPassword((prev) => !prev)}
						>
							<img src={isShowCurrentPassword ? eyeOn : eyeOff} alt="eye" />
						</button>
					</div>
					<div></div>
					{!isValidPassword && (
						<small className="text-password-danger">{passwordError}</small>
					)}
				</div>

				<div className="  password-input-container">
					<span className="password-title ">Mật khẩu mới</span>
					<div
						className={
							isValidNewPassword ? 'input-password' : 'invalid-input-password'
						}
					>
						<input
							className="password-form-input"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							type={isShowNewPassword ? 'text' : 'password'}
							placeholder="Nhập mật khẩu mới"
						/>
						<div className="separator"></div>
						<button
							className="change-password-btn"
							onClick={() => setIsShowNewPassword((prev) => !prev)}
						>
							<img src={isShowNewPassword ? eyeOn : eyeOff} alt="eye" />
						</button>
					</div>
					<div></div>
					{!isValidNewPassword && (
						<small className="text-password-danger">{newPasswordError}</small>
					)}
				</div>

				<div className=" password-input-container">
					<span className="password-title ">Nhập lại mật khẩu</span>
					<div
						className={
							isValidReNewPassword ? 'input-password' : 'invalid-input-password'
						}
					>
						<input
							className="password-form-input"
							value={reNewPassword}
							onChange={(e) => setReNewPassword(e.target.value)}
							type={isShowReNewPassword ? 'text' : 'password'}
							placeholder="Nhập lại mật khẩu mới"
						/>
						<div className="separator"></div>
						<button
							className="change-password-btn"
							onClick={() => setIsShowReNewPassword((prev) => !prev)}
						>
							<img src={isShowReNewPassword ? eyeOn : eyeOff} alt="eye" />
						</button>
					</div>
					<div></div>
					{!isValidReNewPassword && (
						<small className="text-password-danger">{rePasswordError}</small>
					)}
				</div>

				<div className="button-container m-top-24 ">
					<button onClick={handleSave} className="save-btn ">
						Lưu
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default Password;
