import {
	FAVORITE_ACTION,
	RECIPE_LIST,
	NEWS_LIST,
	LIKEDPAGE,
} from '../constants/common.constants';
const initState = {
	likedsList: [],
	dataRecipeByCategory: [],
	dataRecipeByTag: [],
	dataRecipeBySearch: [],
	dataHotRecipe: [],
	dataAllRecipe: [],
	dataNews: [],
	dataLikeds: [],
	recipe: {},
};

export const commonReducer = (state = initState, action) => {
	switch (action.type) {
		case FAVORITE_ACTION.LIKE_POST: {
			state.likedsList = [...action.payload];
			state.dataRecipeByCategory =
				state.dataRecipeByCategory.length > 0 &&
				[...state.dataRecipeByCategory].map((item) => {
					if (item._id === action.id) {
						item.tym = true;
					}
					return item;
				});

			state.dataRecipeByTag =
				state.dataRecipeByTag.length > 0 &&
				[...state.dataRecipeByTag].map((item) => {
					if (item._id === action.id) {
						item.tym = true;
					}
					return item;
				});

			if (state.recipe._id === action.id) {
				state.recipe.tym = true;
			}

			state.dataRecipeBySearch =
				state.dataRecipeBySearch.length > 0 &&
				[...state.dataRecipeBySearch].map((item) => {
					if (item._id === action.id) {
						item.tym = true;
					}
					return item;
				});

			state.dataHotRecipe =
				state.dataHotRecipe.length > 0 &&
				[...state.dataHotRecipe].map((item) => {
					if (item._id === action.id) {
						item.tym = true;
					}
					return item;
				});
			return { ...state };
		}
		case FAVORITE_ACTION.LOAD_WISHLIST: {
			state.likedsList = [...action.payload];
			return { ...state };
		}
		case FAVORITE_ACTION.DELETE_WISHLIST: {
			state.likedsList = [...state.likedsList].filter(
				(item) => item.recipe !== action.payload
			);
			state.dataRecipeByCategory =
				state.dataRecipeByCategory.length > 0 &&
				[...state.dataRecipeByCategory].map((item) => {
					if (item._id === action.payload) {
						item.tym = false;
					}
					return item;
				});

			state.dataRecipeByTag =
				state.dataRecipeByTag.length > 0 &&
				[...state.dataRecipeByTag].map((item) => {
					if (item._id === action.payload) {
						item.tym = false;
					}
					return item;
				});

			if (state.recipe._id === action.payload) {
				state.recipe.tym = false;
			}

			state.dataRecipeBySearch =
				state.dataRecipeBySearch.length > 0 &&
				[...state.dataRecipeBySearch].map((item) => {
					if (item._id === action.payload) {
						item.tym = false;
					}
					return item;
				});

			state.dataHotRecipe =
				state.dataHotRecipe.length > 0 &&
				[...state.dataHotRecipe].map((item) => {
					if (item._id === action.payload) {
						item.tym = false;
					}
					return item;
				});
			return { ...state };
		}

		case RECIPE_LIST.LOAD_RECIPE_BY_CATEGORY: {
			state.dataRecipeByCategory = [...action.payload];
			return { ...state };
		}
		case RECIPE_LIST.LOAD_RECIPE_BY_TAG: {
			state.dataRecipeByTag = [...action.payload];
			return { ...state };
		}
		case RECIPE_LIST.LOAD_RECIPE: {
			state.recipe = { ...action.payload };
			return { ...state };
		}
		case RECIPE_LIST.LOAD_RECIPE_BY_SEARCH: {
			state.dataRecipeBySearch = [...action.payload];
			return { ...state };
		}
		case RECIPE_LIST.LOAD_HOT_RECIPE: {
			state.dataHotRecipe = [...action.payload];
			return { ...state };
		}
		case RECIPE_LIST.LOAD_ALL_RECIPE: {
			state.dataAllRecipe = [...action.payload];
			return { ...state };
		}
		case NEWS_LIST.LOAD_NEWS: {
			state.dataNews = [...action.payload];
			return { ...state };
		}
		case LIKEDPAGE.LOAD_LIKEDPAGE: {
			state.dataLikeds = [...action.payload];
			return { ...state };
		}
		default:
			return { ...state };
	}
};
