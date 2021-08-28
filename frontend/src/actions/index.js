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

export const register = (credentials, history) => (dispatch) => {
	dispatch({
		type: START_FETCHING,
	});
	axiosWithAuth()
		.post("https://justpost8-api.herokuapp.com/auth/register", credentials)
		.then((res) => {
			console.log("register post response:", res);
			dispatch({
				type: REGISTER,
				payload: res.data,
			});
			history.push("/login");
		})
		.catch((err) => {
			dispatch({
				type: FETCH_ERROR,
				payload: err,
			});
		});

	console.log("actions", credentials);
};

export const login = (credentials, history) => (dispatch) => {
	dispatch({
		type: START_FETCHING,
	});
	axiosWithAuth()
		.post("https://justpost8-api.herokuapp.com/auth/login", credentials)
		.then((res) => {
			console.log("login post response:", res, res.status);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user_id", res.data.user.user_id);
			dispatch({
				type: LOGIN,
				payload: res.data.user,
			});
			history.push("/posts");
		})
		.catch((err) => {
			dispatch({
				type: FETCH_ERROR,
				payload: err.response.data.message,
			});
		});
};

export const clearError = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERROR,
	});
};
