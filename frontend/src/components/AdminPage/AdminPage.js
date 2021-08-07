const AdminPage = () => {
	return (
		<div className="admin-age">
			This is admin access
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
				<button> Register as admin </button>
			</form>
		</div>
	);
};

export default AdminPage;
