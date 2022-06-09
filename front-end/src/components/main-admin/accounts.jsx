import axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { Fragment } from 'react/cjs/react.production.min';
import './accounts.css';

const initialDateFilter = {
	sort: 0,
	name: 'all',
};
function Admin() {
	const [dataFilter, setdataFilter] = useState(initialDateFilter);
	if (dataFilter.name === '') {
		dataFilter.name = 'all';
	}
	const [dataUser, setDataUser] = useState([
		{ id: 123, name: 'Nguyễn Duy Phúc' },
	]);
	const [currentUid, setCurrentUid] = useState({ id: '' });

	const Token = Cookies.get('token');

	////////////////////////////////////////////////////////////////
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [currentAdminId, setCurrentAdminId] = useState();
	const [lstLength, setLstLength] = useState(1); // have't use setLstLength
	const items = [...Array(lstLength)];
	const itemsPerPage = 10;
	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	////////////////////////////////////////////////////////////////

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

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setdataFilter((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	////////////////////////////////////////////////////////////////

	const fetchData = () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/v1/user/getAll?page=${currentPage}&sort=${dataFilter.sort}&name=${dataFilter.name}`,
			headers: {
				Authorization: 'Bearer ' + Token,
			},
		})
			.then((res) => {
				const data = res.data.users;
				const newdata = data.map((item, index) => {
					return {
						stt: index + 1, // stt start = 1
						email: item.email,
						birthday: item.birthday,
						name: item.fullName,
						sex: item.sex,
						id: item._id,
					};
				});
				setDataUser(newdata);
				setLstLength(res.data.lengthDocuments);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchData();
		getAdminId();
	}, [currentPage]);

	const getAdminId = () => {
		const Token = Cookies.get('token');
		const user = JSON.parse(atob(Token.split('.')[1]));
		setCurrentAdminId(user.id);
	};

	const onClickSearched = () => {
		fetchData();
	};

	const removeUser = () => {
		axios({
			method: 'DELETE',
			url: `${process.env.REACT_APP_API_URL}/api/v1/user/${currentUid.id}`,
			headers: {
				Authorization: 'Bearer ' + Token,
			},
		})
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
		setIsOpen(false);
	};

	function openModal() {
		setIsOpen(true);
		$('accounts__btn-option').toggle();
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
			<div className="accounts__container">
				<div className="accounts__row">
					<div className="accounts__filter">
						<label className="accounts__lablel">Tìm kiếm</label>
						<input
							type="text"
							className="accounts__input-dateFrom accounts__input"
							placeholder="Nhập tên quản trị viên"
							name="name"
							onChange={handleChange}
						></input>
					</div>
					<div className="accounts__filter">
						<label className="accounts__lablel">Tên tài khoản</label>
						<div className="select__container">
							<select
								className="accounts__input-dateFrom accounts__input"
								placeholder="Tất cả"
								name="sort"
								onChange={handleChange}
							>
								<option value="0">Từ A đến Z</option>
								<option value="1">Từ Z đến A</option>
							</select>
						</div>
					</div>
					<div className="accounts__filter">
						<label className="accounts__lablel">Ngày tạo</label>
						<div className="select__container">
							<select
								className="accounts__input-dateFrom accounts__input"
								placeholder="Tất cả"
								name="sort"
								onChange={handleChange}
							>
								<option value="2">Mới nhất</option>
								<option value="3">Cũ nhất</option>
							</select>
						</div>
					</div>

					<div className="accounts__filter" style={{ width: '15%' }}>
						<button
							className="accounts__button-search"
							onClick={onClickSearched}
						>
							Tìm kiếm
						</button>
					</div>
				</div>

				<div className="accounts__row" style={{ height: '100%' }}>
					<div className="accounts__content">
						{dataUser.length > 0 ? (
							<table className="accounts__table">
								<tr style={{ height: '48px' }}>
									<th style={{ width: '5%', textAlign: 'center' }}>STT</th>
									<th style={{ width: '30%', textAlign: 'left' }}>
										Tên quản trị viên
									</th>
									<th style={{ width: '30%', textAlign: 'left' }}>Email</th>
									<th style={{ width: '12%' }}>Giới tính</th>
									<th style={{ width: '2%' }}></th> {/* Lấy khoảng trống} */}
									<th style={{ width: '12%' }}>Ngày sinh</th>
									<th style={{ width: '10%' }}>Xóa</th>
								</tr>
								{dataUser.map((data, index) => (
									<tr
										style={{
											height: '40px',
											backgroundColor: index % 2 === 0 ? '#F9F9F9' : '#FFFFFF',
										}}
									>
										<td style={{ textAlign: 'center' }}>
											{currentPage * 10 + index + 1}
										</td>
										<td style={{ color: '#3eadcf', wordBreak: 'break-all' }}>
											{data.name}
										</td>
										<td style={{ wordBreak: 'break-all' }}>{data.email}</td>
										<td>{data.sex}</td>
										<td></td> {/* Lấy khoảng trống} */}
										<td>{data.birthday}</td>
										<td>
											{currentAdminId !== data.id && (
												<button
													onClick={(e) => {
														e.stopPropagation();
														openModal();
														setCurrentUid({
															id: data.id,
														});
													}}
												>
													<i class="fas fa-trash"></i>
												</button>
											)}
										</td>
									</tr>
								))}
							</table>
						) : (
							<div className="accounts__content-null">
								<span>Không tìm thấy người phù hợp</span>
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
						</div>
					</div>
				</div>
			</div>

			{/* Modal xóa quản trị viên */}
			<Modal
				isOpen={modalIsOpen}
				// onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="account__modal">
					<div className="modal__row-1">
						<h1>Xóa quản trị viên</h1>
					</div>

					<div className="modal__row-2">
						<span>
							Bạn có muốn xóa quản trị viên này ra khỏi danh sách quản trị viên
							không?
						</span>
					</div>

					<div className="modal__row-3">
						<button onClick={closeModal} className="modal__btn-close">
							Hủy
						</button>
						<button className="modal__btn-delete" onClick={removeUser}>
							Xóa quản trị viên
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
}

export default Admin;
