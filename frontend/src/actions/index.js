import axiosWithAuth from "../utils/axiosWithAuth";

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const START_FETCHING = "START_FETCHING";
export const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";
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
			// history.push("/profile");
		})
		.catch((err) => {
			dispatch({
				type: FETCH_ERROR,
				payload: err.response.data.message,
			});
		});
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
			history.push("/profile");
		})
		.catch((err) => {
			dispatch({
				type: FETCH_ERROR,
				payload: err.response.data.message,
			});
		});
};

//!
export const getUser = (id) => (dispatch) => {
	dispatch({
		type: START_FETCHING,
	});
	axiosWithAuth()
		.get(`https://justpost8-api.herokuapp.com/auth/users/${id}`)
		.then((res) => {
			console.log("getUser response", res.data);
			dispatch({
				type: FETCHING_USER_SUCCESS,
				payload: res.data[0],
			});
		})
		.catch((error) => {
			console.log(error);
			dispatch({
				type: FETCH_ERROR,
				payload: error.response.data.message,
			});
		});
};

export const clearError = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERROR,
	});
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch({
		type: LOGOUT,
	});
};
