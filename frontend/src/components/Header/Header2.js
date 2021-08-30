import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

//neu import
import { Button } from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	navbar: {
		flexGrow: 1,
	},
	toolbar: {
		minHeight: 128,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		alignSelf: "flex-end",
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
}));

const Header2 = (props) => {
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
				<Toolbar className={classes.toolbar} position="fixed">
					<Typography
						className={classes.title}
						variant="h1"
						noWrap
						style={{ fontFamily: "Bebas Neue" }}
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

					{/* <div
						style={{
							height: 128,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-around",
						}}
					>
						{props.isLoggedIn === false && (
							<>
								<Button
									onClick={() => {
										history.push("/register");
									}}
								>
									Signup
								</Button>
								<Button
									onClick={() => {
										history.push("/login");
									}}
								>
									Login
								</Button>{" "}
							</>
						)}
					</div> */}
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant="persistent"
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
				<Divider />
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
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
export default connect(mapStateToProps, {})(Header2);
