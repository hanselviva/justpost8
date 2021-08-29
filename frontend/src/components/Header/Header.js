import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//neu import
import { Button } from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";

const useStyles = makeStyles((theme) => ({
	navbar: {
		flexGrow: 1,
	},
	toolbar: {
		minHeight: 128,
		alignItems: "flex-start",
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		alignSelf: "flex-end",
	},
}));

const Header = () => {
	const classes = useStyles();
	return (
		<div className={classes.navbar}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<Typography
						className={classes.title}
						variant="h1"
						noWrap
						style={{ fontFamily: "Bebas Neue" }}
					>
						JustPost8!
					</Typography>

					<div
						style={{
							height: 128,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-around",
						}}
					>
						<Button>Login</Button>
						<Button>Signup</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
