import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/index";

const Register = (props) => {
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
		props.register(formValues, history);
		console.log("formValues:", formValues);
	};

	return (
		<div className="register">
			Register form here
			<form className="register-form" onSubmit={handleSubmit}>
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
				<button type="submit">Register</button>
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
