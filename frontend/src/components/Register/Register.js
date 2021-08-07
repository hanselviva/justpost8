const Register = () => {
	return (
		<div className="register">
			Register form here
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
				<button> Register </button>
			</form>
		</div>
	);
};

export default Register;
