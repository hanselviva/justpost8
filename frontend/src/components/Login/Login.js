import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearError, login } from "../../actions/index";

const Login = (props) => {
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const history = useHistory();

	useEffect(() => {
		props.clearError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.clearError]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		props.login(formValues, history);
	};

	return (
		<div className="login">
			login form here
			<form className="login-form" onSubmit={handleSubmit}>
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
				<button>LOG IN</button>

				<p>
					no account? <a href="/register">register now</a>
				</p>
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

export default connect(mapStateToProps, { login, clearError })(Login);
