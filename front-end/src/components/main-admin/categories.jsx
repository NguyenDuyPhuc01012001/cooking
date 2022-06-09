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
function Categories() {
	const [dataFilter, setDataFilter] = useState(initialDateFilter);
	const [dataCategory, setDataCategory] = useState([]);
	const [postClick, setpostClick] = useState({ id: '' });
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
						link: item.short_title + '?page=0',
					};
				});
				setDataCategory(newData);
				setLstLength(res.data.lengthDocuments);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchData();
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
			url: `${process.env.REACT_APP_API_URL}/api/v1/categories/${postClick.id}`,
			headers: {
				Authorization: 'Bearer ' + Token,
			},
		})
			.then((res) => {})
			.catch((err) => {
				console.log(err);
			});
		setIsOpen(false);
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
				<div className="posts__content">
					{dataCategory.length > 0 ? (
						<table className="posts__table">
							<tr style={{ height: '48px' }}>
								<th style={{ width: '5%', textAlign: 'center' }}>STT</th>
								<th style={{ width: '2%' }}></th> {/* Lấy khoảng trống} */}
								<th style={{ width: '15%', textAlign: 'left' }}>Phân loại</th>
								<th style={{ width: '2%' }}></th>
								<th style={{ width: '60%' }}>Hình ảnh</th>
								<th style={{ width: '3%' }}></th>
								<th style={{ width: '3%' }}></th>
							</tr>
							{dataCategory.map((data, index) => (
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
											to={`/user/category/${data.link}`}
											style={{ fontWeight: 500 }}
										>
											{data.title}
										</Link>
									</td>
									<td></td> {/* Lấy khoảng trống} */}
									<td>
										<a href={data.image}>{data.image}</a>
									</td>
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
														Sửa phân loại
													</a>
												</div>
												<div style={{ borderTop: '1px solid #000000' }}>
													<a href="/upcoming" style={{ fontWeight: 500 }}>
														Xóa phân loại
													</a>
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
						{/* <a
							href="/user/create/recipe"
							className="posts__btn-news"
							style={{ margin: '16px', float: 'right', fontWeight: 500 }}
						>
							Đăng tin mới
						</a> */}
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
						<h1>Xóa phân loại</h1>
					</div>

					<div className="modal__row-2">
						<span>Bạn có muốn xóa loại công thức ra khỏi danh sách không?</span>
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
							Xóa
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
}

export default Categories;
