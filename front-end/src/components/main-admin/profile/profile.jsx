import { css } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react/cjs/react.production.min';
import * as yup from 'yup';
import '../../post/post-recipe.css';
import BasicInfo from './basic-info';
import './basic-info.css';

const schema = yup.object().shape({
	fullName: yup
		.string()
		.required('Bạn cần nhập thông tin')
		.min(
			3,
			'Vui lòng nhập tên của bạn. Tối thiểu là 3 ký tự và tối đa là 50 ký tự.'
		)
		.max(
			50,
			'Vui lòng nhập tên của bạn. Tối thiểu là 3 ký tự và tối đa là 50 ký tự.'
		),
});

function Profile() {
	let user;

	const history = useHistory();

	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		criteriaMode: 'all',
	});

	const apiImage = 'https://api.cloudinary.com/v1_1/nam-duong/upload';

	const [basicInfo, setBasicInfo] = useState({
		email: '',
		fullName: '',
		birthday: '',
		gender: '',
	});

	const [files, setFiles] = useState(null);
	const [isSubmitting, setSubmitting] = useState(false);

	useEffect(() => {
		const Token = Cookies.get('token');
		user = JSON.parse(atob(Token.split('.')[1]));
		// console.log(Token);

		const baseURL = `${process.env.REACT_APP_API_URL}/api/v1/user/profile/${user.id}`;

		function getUserInfo() {
			axios.get(baseURL).then((response) => {
				const data = response.data;
				// console.log(response);
				const userBasicInfo = {
					fullName: data.fullName,
					birthday: data.birthday,
					image: data.image,
					email: data.email,
					gender: data.sex ? data.sex : 'Nam',
				};

				setBasicInfo({
					...basicInfo,
					...userBasicInfo,
				});
			});
		}
		getUserInfo();
	}, []);

	const handleChangeBasicInfo = (e) => {
		setBasicInfo({
			...basicInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmitForm = async (data) => {
		let { fullName, birthday, image, gender, email } = basicInfo;

		// if file have change
		let newImage;
		if (files) {
			const imageFormData = new FormData();
			imageFormData.append('file', files);
			imageFormData.append('upload_preset', 'cooking');
			const res = await axios.post(apiImage, imageFormData);
			const imageData = res.data;
			if (imageData != null) {
				const url = imageData.secure_url;
				newImage = url;
			}
			image = newImage;
		}

		const formData = {
			fullName,
			email,
			image,
			birthday,
			sex: gender,
		};

		// anything is available for updating user1

		setSubmitting(true);

		const Token = Cookies.get('token');
		user = JSON.parse(atob(Token.split('.')[1]));

		const config = {
			headers: { Authorization: `Bearer ${Token}` },
		};

		const apiURL = `${process.env.REACT_APP_API_URL}/api/v1/user/${user.id}`;
		axios
			.put(apiURL, formData, config)
			.then((res) => {
				const data = res.data;
				// console.log(data);
				toast.success('Cập nhật thành công', {
					position: 'bottom-left',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: true,
				});

				history.push(`/admin/profile`);
				setSubmitting(false);
			})
			.catch((error) => {
				console.log(error);

				toast.error('Cập nhật thất bại. Hết phiên đăng nhập', {
					position: 'bottom-left',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
				});
				setSubmitting(false);
			});
	};

	return (
		<Fragment>
			<div class="parent_container">
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(handleSubmitForm)}>
						<div className="basic_info">
							<BasicInfo
								data={basicInfo}
								setBasicInfo={handleChangeBasicInfo}
								setFiles={setFiles}
							/>
							<input type="submit" value="Lưu" className="btnSave" />
						</div>
					</form>
				</FormProvider>

				<ToastContainer />
				{isSubmitting && (
					<div className="post-real-estate-overlay">
						<ClipLoader
							color={'white'}
							css={css`
								border-width: 3px;
							`}
							loading={true}
							size={40}
						/>
					</div>
				)}
			</div>
		</Fragment>
	);
}

export default Profile;
