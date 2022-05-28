import './post-recipe.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Instruction from './instruction';
import Ingredient from './ingredient';
import Image from './image';
import BasicInfo from './basic_info';
import Des_info from './des_info';
import Tag from './tag';
import Cookies from 'js-cookie';
import ClipLoader from 'react-spinners/ClipLoader';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { FaPhoneVolume } from 'react-icons/fa';

const schema = yup.object().shape({
	title: yup
		.string()
		.required(
			'Vui lòng nhập tiêu đề của bạn. Tối thiểu là 30 ký tự và tối đa là 99 ký tự.'
		)
		.min(
			5,
			'Vui lòng nhập tiêu đề của bạn. Tối thiểu là 5 ký tự và tối đa là 99 ký tự.'
		)
		.max(
			99,
			'Vui lòng nhập tiêu đề của bạn. Tối thiểu là 5 ký tự và tối đa là 99 ký tự.'
		),
	category: yup
		.string()
		.required('Bạn cần nhập thông tin')
		.test('inValid', 'Vui lòng nhập phân loại', (value) => {
			return value !== 'none';
		}),
	content: yup
		.string()
		.required(
			'Vui lòng nhập mô tả của bạn. Tối thiểu là 30 ký tự và tối đa là 3000 ký tự.'
		)
		.min(
			30,
			'Vui lòng nhập mô tả của bạn. Tối thiểu là 30 ký tự và tối đa là 3000 ký tự.'
		)
		.max(
			3000,
			'Vui lòng nhập mô tả của bạn. Tối thiểu là 30 ký tự và tối đa là 3000 ký tự.'
		),
});

const apiImage = 'https://api.cloudinary.com/v1_1/nam-duong/upload';

const PostRecipe = () => {
	const history = useHistory();
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const [isSubmitting, setSubmitting] = useState(false);

	const [ingredientList, setIngredientList] = useState([{ ingredient: '' }]);
	const [instructionList, setInstructionList] = useState([{ instruction: '' }]);
	const [tagList, setTagList] = useState([{ tag: '' }]);

	const [basicInfo, setBasicInfo] = useState({
		title: '',
		category: '',
		prepTime: '',
		cookTime: '',
		people: '',
	});

	const [description, setDescription] = useState('');
	const [files, setFiles] = useState([]);
	useEffect(() => {
		if (files.length > 1) {
			const newFiles = files.slice('', 1);
			setFiles(newFiles);
		}
	}, [files]);

	const [author, setAuthor] = useState('');
	useEffect(() => {
		const Token = Cookies.get('token');
		if (!Token) return;
		const userInfo = JSON.parse(atob(Token.split('.')[1]));
		if (!userInfo) return;
		axios
			.get(
				`${process.env.REACT_APP_API_URL}/api/v1/user/profile/${userInfo.id}`
			)
			.then((res) => {
				const data = res.data;
				const user = data;
				let {
					_id,
					fullName,
					email,
					password,
					image,
					birthday,
					sex,
					isVerifyEmail,
				} = user;

				sex = sex || 'Nam';

				const userData = {
					_id,
					fullName,
					email,
					password,
					image,
					birthday,
					sex,
					isVerifyEmail,
				};
				setAuthor(userData);
			});
	}, []);

	const handleSubmitForm = async (e) => {
		setSubmitting(true);
		let pictures = [];
		for (let file of files) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'cooking');
			const res = await axios.post(apiImage, formData);
			const data = res.data;
			if (data != null) {
				const url = data.secure_url;
				pictures = pictures.concat(url);
			}
			URL.revokeObjectURL(file.preview);
		}
		let ingredients = [];
		for (let ingredient of ingredientList) {
			ingredients.push(ingredient.ingredient);
		}
		let instructions = [];
		for (let instruction of instructionList) {
			instructions.push(instruction.instruction);
		}
		const difficulty = 'easy';
		let { title, category, cookTime, prepTime, people } = basicInfo;
		const formData = {
			title,
			category,
			cookTime,
			prepTime,
			people,
			pictures,
			description,
			ingredients,
			instructions,
			tags: tagList,
			difficulty,
			author,
		};
		console.log(formData);
		setSubmitting(false);
		const apiURL = `${process.env.REACT_APP_API_URL}/api/v1/recipe/`;
		axios
			.post(apiURL, formData)
			.then((res) => {
				const data = res.data;
				toast.success('Đăng bài thành công', {
					position: 'bottom-left',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: true,
				});
				history.push(`/user/recipe/${data._id}`);
				setSubmitting(false);
			})
			.catch((error) => {
				console.log(error);
				toast.error('Đăng bài thất bại', {
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
		<>
			<div className="post-real-estate-container">
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(handleSubmitForm)}
						className="post__container"
					>
						<h1 className="post__title">ĐĂNG TẢI CÔNG THỨC NẤU ĂN</h1>
						<p className="text__title">
							(Vui lòng nhập đầy đủ thông tin theo các mục dưới đây)
						</p>
						<BasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
						<Des_info
							description={description}
							setDescription={setDescription}
						/>
						<Image
							files={files}
							setFiles={setFiles}
							fileLength={files.length}
						/>
						<Ingredient
							ingredientList={ingredientList}
							setIngredientList={setIngredientList}
						/>

						<Instruction
							instructionList={instructionList}
							setInstructionList={setInstructionList}
						/>

						<Tag tagList={tagList} setTagList={setTagList} />
						<button type="submit" className="btnPost">
							Đăng tin
						</button>
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
		</>
	);
};

export default PostRecipe;
