import axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import './posts.css';

const initialDateFilter = {
	dateStart: '',
	dateEnd: '',
	realEstateID: '',
	categoryID: '',
	typeID: '',
	provinceID: '',
	page: 0,
};
function Posts() {
	const [dataFilter, setDataFilter] = useState(initialDateFilter);
	const [dataRecipe, setDataRecipe] = useState([]);
	const [dataCategory, setDataCategory] = useState([]);
	const [postClick, setPostClick] = useState({ id: '' });
	const Token = Cookies.get('token');

	////////////////////////////////////////////////////////////////
	const [currentPage, setCurrentPage] = useState(0);
	const [lstLength, setLstLength] = useState(1); // have't use setLstLength
	const items = [...Array(lstLength)];
	const itemsPerPage = 10;
	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(items.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(items.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, lstLength]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setCurrentPage(event.selected);
		setItemOffset(newOffset);
	};

	////////////////////////////////////////////////////////////////

	const fetchData = () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/v1/recipe/getAll/admin?title=${dataFilter.title}&category=${dataFilter.category}&difficulty=${dataFilter.difficulty}&page=${currentPage}`,
			headers: {
				Authorization: 'Bearer ' + Token,
			},
		})
			.then((res) => {
				const data = res.data.recipes;
				const newData = data.map((item, index) => {
					return {
						stt: index + 1, // stt start = 1
						id: item._id,
						title: item.title,
						category: item.category,
						difficulty: item.difficulty,
						author: item.author.fullName,
					};
				});
				setDataRecipe(newData);
				setLstLength(res.data.lengthDocuments);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchCategory = () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/v1/categories/?page=${currentPage}`,
			headers: {
				Authorization: 'Bearer ' + Token,
			},
		})
			.then((res) => {
				const data = res.data.categories;
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
		fetchData();
		fetchCategory();
	}, [currentPage]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDataFilter((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const removePost = async () => {
		await axios({
			method: 'DELETE',
			url: `${process.env.REACT_APP_API_URL}/api/v1/recipe/${postClick.id}`,
			headers: {
				Authorization: 'Bearer ' + Token,
			},
		})
			.then((res) => {
				closeModal();
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
		closeModal();
		window.location.reload();
	};

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
		$('posts__btn-option').toggle();
	}

	function closeModal() {
		setIsOpen(false);
	}

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};
	return (
		<Fragment>
			<div className="posts__container">
				<div className="posts__row">
					<div className="posts__filter span__title__filter">
						<label className="posts__label">Tiêu đề</label>
						<input
							type="text"
							className="posts__input-dateFrom posts__input"
							placeholder="Nhập tiêu đề công thức"
							name="title"
							onChange={handleChange}
						></input>
					</div>
					<div className="posts__filter">
						<button className="posts__button-search" onClick={fetchData}>
							Tìm kiếm
						</button>
					</div>
				</div>
				<div className="posts__row">
					<div className="posts__filter filter-2">
						<label className="posts__label">Phân loại</label>
						<div className="select__container">
							<select
								className="posts__input-dateFrom posts__input"
								placeholder="Tất cả"
								name="category"
								onChange={handleChange}
							>
								<option value="">Tất cả</option>
								{dataCategory.map((option) => (
									<option key={option.id} value={option.short_title}>
										{option.short_title}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="posts__filter filter-2">
						<label className="posts__label">Độ khó</label>
						<div className="select__container">
							<select
								className="posts__input-dateFrom posts__input"
								placeholder="Tất cả"
								name="difficulty"
								onChange={handleChange}
							>
								<option value="">Tất cả</option>
								<option value="Dễ">Dễ</option>
								<option value="Trung bình">Trung bình</option>
								<option value="Khó">Khó</option>
							</select>
						</div>
					</div>
				</div>

				<div className="posts__content">
					{/*  */}
					{dataRecipe.length > 0 ? (
						<table className="posts__table">
							<tr style={{ height: '48px' }}>
								<th style={{ width: '5%', textAlign: 'center' }}>STT</th>
								<th style={{ width: '2%' }}></th> {/* Lấy khoảng trống} */}
								<th style={{ width: '30%', textAlign: 'left' }}>Tiêu đề</th>
								<th style={{ width: '2%' }}></th>
								<th style={{ width: '10%' }}>Phân loại</th>
								<th style={{ width: '10%' }}>Độ khó</th>
								<th style={{ width: '10%' }}>Tên người đăng</th>
								<th style={{ width: '3%' }}></th>
								<th style={{ width: '3%' }}></th>
							</tr>
							{dataRecipe.map((data, index) => (
								<tr
									style={{
										height: '40px',
										backgroundColor: index % 2 === 0 ? '#F9F9F9' : '#FFFFFF',
									}}
								>
									<td style={{ textAlign: 'center' }}>
										{currentPage * 10 + index + 1}
									</td>
									<td></td> {/* Lấy khoảng trống} */}
									<td style={{ color: '#3eadcf', wordBreak: 'break-all' }}>
										<Link
											to={`/user/recipe/${data.id}`}
											style={{ fontWeight: 500 }}
										>
											{data.title}
										</Link>
									</td>
									<td></td> {/* Lấy khoảng trống} */}
									<td>{data.category}</td>
									<td>{data.difficulty}</td>
									<td>{data.author}</td>
									<td></td> {/* Lấy khoảng trống} */}
									<td>
										<td>
											<div
												className={`posts__btn-option btn-option${index}`}
												style={{ display: 'none' }}
												onMouseLeave={() => {
													$('.btn-option' + index).toggle();
												}}
											>
												<div>
													<a href="/upcoming" style={{ fontWeight: 500 }}>
														Sửa bài đăng
													</a>
												</div>
												<div style={{ borderTop: '1px solid #000000' }}>
													<button
														style={{ fontWeight: 500 }}
														onClick={(e) => {
															e.stopPropagation();
															$('.btn-option' + index).toggle();
															openModal();
															setPostClick({ id: data.id });
														}}
													>
														Xóa bài đăng
													</button>
												</div>
											</div>
										</td>
										<button
											onClick={(e) => {
												e.stopPropagation();
												$('.btn-option' + index).toggle();
											}}
										>
											<i class="fas fa-ellipsis-v"></i>
										</button>
									</td>
								</tr>
							))}
						</table>
					) : (
						<div className="posts__content-null">
							<h5>Không tìm được tin đăng phù hợp</h5>
						</div>
					)}

					<div className="center">
						<div className="pagination">
							<ReactPaginate
								breakLabel="..."
								nextLabel={<i className="fas fa-chevron-right"></i>}
								onPageChange={handlePageClick}
								pageRangeDisplayed={5}
								pageCount={pageCount}
								previousLabel={<i className="fas fa-chevron-left"></i>}
								renderOnZeroPageCount={null}
								activeClassName="active"
							/>
						</div>
						<a
							href="/user/create/recipe"
							className="posts__btn-news"
							style={{ margin: '16px', float: 'right', fontWeight: 500 }}
						>
							Đăng tin mới
						</a>
					</div>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				// onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="posts__modal">
					<div className="modal__row-1">
						<h1>Xóa bài đăng</h1>
					</div>

					<div className="modal__row-2">
						<span>
							Bạn có muốn xóa bài đăng ra khỏi danh sách bài đăng không?
						</span>
					</div>

					<div className="modal__row-3">
						<button
							onClick={closeModal}
							className="modal__btn-close"
							style={{ fontWeight: 500 }}
						>
							Hủy
						</button>
						<button
							className="modal__btn-delete"
							style={{ fontWeight: 500 }}
							onClick={removePost}
						>
							Xóa bài đăng
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
}

export default Posts;
