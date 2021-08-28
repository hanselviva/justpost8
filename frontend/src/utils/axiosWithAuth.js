import axios from "axios";

const axiosWithAuth = () => {
	const token = localStorage.getItem("token");
	// console.log("token:", token);
	return axios.create({
		headers: {
			authorization: `Bearer ${token}`,
		},
		// baseURL: "http://localhost:5000/api",
	});
};

export default axiosWithAuth;
