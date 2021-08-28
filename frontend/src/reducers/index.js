import {
	// ACTIONS
	REGISTER,
	LOGIN,
	START_FETCHING,
	FETCHING_USER_SUCCESS,
	FETCHING_POSTS_SUCCESS,
	CREATE_POST_SUCCESS,
	UPDATE_POST_SUCCESS,
	DELETE_POST_SUCCESS,
	LOGOUT,
	FETCH_ERROR,
	CLEAR_ERROR,
} from "../actions";

export const initialState = {
	isLoading: false,
	isLoggedIn: false,
	user: null,
	dbError: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER: //done
			return {
				...state,
				user: action.payload,
				isLoading: false,
			};
		case LOGIN:
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
				isLoading: false,
				dbError: null,
			};
		case START_FETCHING:
			return {
				...state,
				isLoading: true,
			};
		case FETCHING_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				dbError: null,
			};
		case FETCHING_POSTS_SUCCESS:
			return {
				...state,
				posts: action.payload,
				isLoading: false,
				dbError: null,
			};
		case CREATE_POST_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				dbError: null,
			};
		case UPDATE_POST_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				dbError: null,
			};
		case DELETE_POST_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				dbError: null,
			};
		case LOGOUT:
			return initialState;
		case FETCH_ERROR:
			return {
				...state,
				dbError: action.payload,
				isLoading: false,
			};
		case CLEAR_ERROR:
			return {
				...state,
				dbError: false,
			};
		default:
			return state;
	}
};
