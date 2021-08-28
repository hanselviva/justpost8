import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/index";

const Register = () => {
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await function () {
			register(formValues);
		};
		history.push("/posts");
	};

	return (
		<div className="register">
			Register form here
			<form className="login-form">
				<label>
					Username:
					<input
						type="text"
						name="username"
						value={formValues.username}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type="text" //need to change to password
						name="password"
						value={formValues.password}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button onClick={handleSubmit}>Register</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	user: state.user,
	fetchError: state.fetchError,
});

export default connect(mapStateToProps, { register })(Register);
