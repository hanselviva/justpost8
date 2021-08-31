import {
	// ACTIONS
	REGISTER,
	LOGIN,
	START_FETCHING,
	FETCHING_USER_SUCCESS,
	LOGOUT,
	FETCH_ERROR,
	CLEAR_ERROR,
} from "../actions";

export const initialState = {
	isLoading: false,
	isLoggedIn: false,
	dbError: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER: //done
			return {
				...state,
				isLoading: false,
			};
		case LOGIN:
			return {
				...state,
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
				isLoggedIn: true,
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
