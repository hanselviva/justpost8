import React, { useState } from "react";
import { connect } from "react-redux";

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
	const [open, setOpen] = useState(false);

	const handleClickOpen = (e) => {
		e.preventDefault();
		if (props.isLoggedIn === false) {
			setOpen(true);
		}
		//need to add else if user if logged in
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container component="main" maxWidth="md" className={classes.createPost}>
			<CssBaseline />
			<div className={classes.paper}>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Title"
						name="post_title"
					/>
					<Divider elevated={true} />
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="post_body"
						label="What do you want to say?"
						multiline={true}
						rows={5}
					/>
					<Divider elevated={true} />
					<Button bordered className={classes.submit} onClick={handleClickOpen}>
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
						className={classes.dialogButton}
						onClick={handleClose}
						color="primary"
					>
						Login
					</Button>
					<Button
						className={classes.dialogButton}
						onClick={handleClose}
						color="primary"
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
});

export default connect(mapStateToProps, {})(CreatePost);
