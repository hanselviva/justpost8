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

export default Login;
