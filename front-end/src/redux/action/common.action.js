import {
	FAVORITE_ACTION,
	RECIPE_LIST,
	NEWS_LIST,
	LIKEDPAGE,
} from '../constants/common.constants';
import axios from 'axios';
import Cookies from 'js-cookie';
export const LoadWishlist = (list) => {
	return {
		type: FAVORITE_ACTION.LOAD_WISHLIST,
		payload: list,
	};
};

export const LikePost = (id) => {
	const Token = Cookies.get('token');
	return async (dispatch) => {
		try {
			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_URL}/api/v1/user/liked`,
				data: {
					recipe: id,
				},
				headers: {
					Authorization: 'Bearer ' + Token,
				},
			})
				.then((res) => {
					dispatch({
						type: FAVORITE_ACTION.LIKE_POST,
						payload: res.data.list,
						id: res.data.id,
					});
				})
				.catch((err) => {
					console.log(err);
					// setimg(Heart);
					// setIsShowSignIn(true);
				});
		} catch (err) {
			console.log(err);
		}
	};
};
export const DeleteLikePost = (itemID) => {
	const Token = Cookies.get('token');
	return async (dispatch) => {
		try {
			dispatch({
				type: FAVORITE_ACTION.DELETE_WISHLIST,
				payload: itemID,
			});
			await axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_URL}/api/v1/users/liked`,
				data: {
					recipe: itemID,
				},
				headers: {
					Authorization: 'Bearer ' + Token,
				},
			}).catch((err) => {
				console.log(err);
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const LoadRecipeByCategory = (list) => {
	return {
		type: RECIPE_LIST.LOAD_RECIPE_BY_CATEGORY,
		payload: list,
	};
};
export const LoadRecipeByTag = (list) => {
	return {
		type: RECIPE_LIST.LOAD_RECIPE_BY_TAG,
		payload: list,
	};
};
export const LoadRecipe = (object) => {
	return {
		type: RECIPE_LIST.LOAD_RECIPE,
		payload: object,
	};
};
export const LoadRecipeBySearch = (list) => {
	return {
		type: RECIPE_LIST.LOAD_RECIPE_BY_SEARCH,
		payload: list,
	};
};

export const LoadHotRecipe = (list) => {
	return {
		type: RECIPE_LIST.LOAD_HOT_RECIPE,
		payload: list,
	};
};

export const LoadAllRecipe = (list) => {
	return {
		type: RECIPE_LIST.LOAD_ALL_RECIPE,
		payload: list,
	};
};

export const LoadNews = (list) => {
	return {
		type: NEWS_LIST.LOAD_NEWS,
		payload: list,
	};
};
export const LoadLikedPage = (list) => {
	return {
		type: LIKEDPAGE.LOAD_LIKEDPAGE,
		payload: list,
	};
};
