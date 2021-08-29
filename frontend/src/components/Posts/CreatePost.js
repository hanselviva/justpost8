import React from "react";
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

const CreatePost = () => {
	const classes = useStyles();

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
					<Button bordered className={classes.submit}>
						<BorderColorOutlinedIcon style={{ marginRight: "10px" }} />
						Post 8!
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default CreatePost;
