import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
//
import { Divider, Button } from "ui-neumorphism";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
	dialog: {},
	dialogButton: {
		margin: theme.spacing(2),
	},
}));

const CreatePost = (props) => {
	const classes = useStyles();
	const [formValues, setFormValues] = useState({
		post_title: "",
		post_body: "",
	});
	const [open, setOpen] = useState(false);
	const history = useHistory();
	const [disabled, setDisabled] = useState(false);
	const [redTitleDivider, setRedTitleDivider] = useState("");
	const [redBodyDivider, setRedBodyDivider] = useState("");

	//title limiter to 65 chars
	useEffect(() => {
		if (formValues.post_title.length > 65) {
			setDisabled(true);
			setRedTitleDivider("red");
		} else {
			setDisabled(false);
			setRedTitleDivider("");
		}
	}, [formValues.post_title.length]);

	//body limited to 420 chars
	useEffect(() => {
		if (formValues.post_body.length > 420) {
			setDisabled(true);
			setRedBodyDivider("red");
		} else {
			setDisabled(false);
			setRedBodyDivider("");
		}
	}, [formValues.post_body.length]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleClickOpen = (e) => {
		e.preventDefault();
		if (props.isLoggedIn === false) {
			setOpen(true);
		} else {
			const postValues = {
				...formValues,
				user_id: props.user?.user_id,
			};
			axios
				.post(`https://justpost8-api.herokuapp.com/posts/create`, postValues)
				.then(window.location.reload())
				.catch((err) =>
					console.log("create post err:", err.response.data.message),
				);
		}
		//need to add else if user if logged in
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container component="main" maxWidth="sm" className={classes.createPost}>
			<CssBaseline />
			<div className={classes.paper}>
				<form className={classes.form} noValidate>
					<TextField
						inputProps={{ style: { fontSize: 18 } }}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Title"
						name="post_title"
						onChange={handleChange}
						value={formValues.post_title}
					/>
					<Divider
						elevated={true}
						style={{ backgroundColor: redTitleDivider }}
					/>
					<TextField
						inputProps={{ style: { fontSize: 18 } }}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="What do you want to say? (limit 420 characters)"
						multiline={true}
						rows={7}
						name="post_body"
						onChange={handleChange}
						value={formValues.post_body}
					/>
					<Divider
						elevated={true}
						style={{ backgroundColor: redBodyDivider }}
					/>
					<Button
						bordered
						className={classes.submit}
						onClick={handleClickOpen}
						disabled={disabled}
					>
						<BorderColorOutlinedIcon style={{ marginRight: "10px" }} />
						Post 8!
					</Button>
				</form>
			</div>

			<Dialog open={open} onClose={handleClose} className={classes.dialog}>
				<DialogTitle>{"You are not logged in."}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Please login or register to post on our wall.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="var(--primary)"
						className={classes.dialogButton}
						onClick={() => {
							history.push("/login");
						}}
					>
						Login
					</Button>
					<Button
						color="var(--primary)"
						className={classes.dialogButton}
						onClick={() => {
							history.push("/register");
						}}
						autoFocus
					>
						Register
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	user: state.user,
});

export default connect(mapStateToProps, {})(CreatePost);
