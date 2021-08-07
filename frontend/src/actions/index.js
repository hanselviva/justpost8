import axiosWithAuth from "../utils/axiosWithAuth";

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const START_FETCHING = "START_FETCHING";
export const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";
export const FETCHING_POSTS_SUCCESS = "FETCHING_POSTS_SUCCESS";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const LOGOUT = "LOGOUT";
export const FETCH_ERROR = "FETCH_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export const register = () => (dispatch) => {
	dispatch({
		type: START_FETCHING,
	});
	axiosWithAuth()
		.post()
		.then.catch((err) => {
			dispatch({
				type: FETCH_ERROR,
				payload: err,
			});
		});
};
