import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearError, register } from "../../actions/index";

//
//
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockIcon from "@material-ui/icons/Lock";
import { Divider, Button } from "ui-neumorphism";

const useStyles = makeStyles((theme) => ({
	createPost: {
		paddingBottom: theme.spacing(8),
	},
	paper: {
		marginTop: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Register = (props) => {
	const classes = useStyles();
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
		props.register(formValues, history);
	};

	return (
		<Container component="main" maxWidth="sm" className={classes.createPost}>
			<CssBaseline />
			<div className={classes.paper}>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="username"
						name="username"
						value={formValues.username}
						onChange={handleChange}
					/>
					<Divider elevated={true} />
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="password"
						type="password"
						value={formValues.password}
						onChange={handleChange}
					/>
					<Divider elevated={true} />
					<Button bordered className={classes.submit}>
						<LockIcon style={{ marginRight: "10px" }} />
						Register
					</Button>
					<p>
						Already have an account? <a href="/login"> Login</a>.
					</p>
				</form>
			</div>
		</Container>
	);
};
const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	fetchError: state.fetchError,
});
export default connect(mapStateToProps, { register, clearError })(Register);
