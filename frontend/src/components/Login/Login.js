import { connect } from "react-redux";

const Login = () => {
	return (
		<div className="login-wrapper">
			<form className="login-form">
				<label>
					Username:
					<input type="text" />
				</label>
				<br />
				<label>
					Password:
					<input type="password" />
				</label>
				<br />
				<button> Login </button>
			</form>
			no account?
			<a href="/register"> Register now </a>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	user: state.user,
	fetchError: state.fetchError,
});

export default connect(mapStateToProps, {})(Login);
