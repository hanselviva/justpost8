import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

//neu import
import { Button } from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";

const useStyles = makeStyles((theme) => ({
	navbar: {
		flexGrow: 1,
	},
	toolbar: {
		minHeight: 128,
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		display: "flex",
		justifyContent: "space-between",
	},
	title: {
		cursor: "pointer",
		display: "flex",
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-start",
	},
	drawerMenu: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginTop: theme.spacing(8),
	},
	drawerButton: {
		margin: theme.spacing(1),
	},
}));

const drawerWidth = 240;

const Header = (props) => {
	const history = useHistory();
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.navbar}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<Typography
						className={classes.title}
						variant="h1"
						noWrap
						style={{ fontFamily: "Bebas Neue" }}
						onClick={() => {
							history.push("/");
						}}
					>
						JustPost8!
					</Typography>

					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="end"
						onClick={handleDrawerOpen}
						className={clsx(open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				// variant="persistent"
				anchor="right"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>

				<List className={classes.drawerMenu}>
					{props.isLoggedIn === false && (
						<>
							{["login", "register"].map((text, index) => (
								<Button
									bordered
									key={index}
									onClick={() => {
										history.push(`/${text}`);
									}}
									className={classes.drawerButton}
								>
									{text}
								</Button>
							))}
						</>
					)}

					{props.isLoggedIn === true && (
						<>
							{["profile", "logout"].map((text, index) => (
								<Button
									bordered
									key={index}
									onClick={() => {
										history.push(`/${text}`);
									}}
									className={classes.drawerButton}
								>
									{text}
								</Button>
							))}
						</>
					)}
				</List>
				<List
					className={classes.drawerMenu}
					style={{ marginTop: theme.spacing(4) }}
				>
					<Button
						depressed
						onClick={() => {
							history.push(`/`);
						}}
						className={classes.drawerButton}
					>
						View code
					</Button>
				</List>
			</Drawer>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	fetchError: state.fetchError,
});
export default connect(mapStateToProps, {})(Header);
