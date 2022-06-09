import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import { LoadRecipeByCategory } from '../../redux/action';
import './category.css';

function Category() {
	const findByCategoryLink = '/user/category';
	function useQuery() {
		const { search } = useLocation();

		return React.useMemo(() => new URLSearchParams(search), [search]);
	}
	let { type } = useParams();
	let query = useQuery();
	const history = useHistory();
	let pageNumber = query.get('page');
	if (pageNumber === null) pageNumber = 0;
	const [currentPage, setCurrentPage] = useState(pageNumber);
	const [lstLength, setLstLength] = useState(1);
	const items = [...Array(lstLength)];
	const itemsPerPage = 9;
	////////////////////////////////////////////////////////////////
	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const { dataRecipeByCategory } = useSelector((state) => state.commonReducer);
	const dispatch = useDispatch();

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
		window.scrollTo(0, 0);
		history.push(findByCategoryLink + `/${type}?page=` + event.selected);
	};
	/////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		setCurrentPage(pageNumber);
	}, [pageNumber]);
	useEffect(() => {
		const url = `${process.env.REACT_APP_API_URL}/api/v1/recipe/category/${type}?page=${currentPage}`;
		async function getdataRecipeByCategory() {
			fetch(url, {
				method: 'GET',
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setLstLength(data.lengthDocuments);
					// setdataRecipeByCategory(data.recipes);
					dispatch(LoadRecipeByCategory(data.recipes));
				})
				.catch((err) => console.log(err));
		}
		getdataRecipeByCategory();
	}, [currentPage, type]);
	return (
		<Fragment>
			{/* <Type /> */}
			<div className="wrapper">
				<div className="body__container ">
					<div className="grid_recipes">
						{dataRecipeByCategory.map((item, index) => {
							return (
								<div className="card_recipe" key={index}>
									<Link to={'/user/recipe/' + item._id}>
										<img
											src={item.pictures.length > 0 ? item.pictures[0] : ''}
											alt={item.title}
										/>
									</Link>
									<h5>{item.title}</h5>
								</div>
							);
						})}
					</div>
					<div className="center">
						<div className="pagination">
							<ReactPaginate
								breakLabel="..."
								nextLabel={<i className="fas fa-chevron-right"></i>}
								onPageChange={handlePageClick}
								pageRangeDisplayed={2}
								marginPagesDisplayed={2}
								pageCount={pageCount}
								previousLabel={<i className="fas fa-chevron-left"></i>}
								renderOnZeroPageCount={null}
								activeClassName="active"
								forcePage={parseInt(currentPage)}
							/>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Category;
