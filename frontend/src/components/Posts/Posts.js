import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearError, getUser } from "../../actions/index";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import Loader from "../Loader/Loader";

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
	spinnerWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const Posts = (props) => {
	const [posts, setPosts] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		props.clearError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.clearError]);

	useEffect(() => {
		const loggedIn = localStorage.getItem("user_id");
		if (loggedIn) {
			props.getUser(loggedIn);
		}
		axios
			.get("https://justpost8-api.herokuapp.com/posts")
			.then((res) => {
				setPosts(res.data);
			})
			.catch((err) => {
				console.log("fetching all posts err ", err.response.data.message);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container className={classes.cardGrid} maxWidth="lg">
			<CreatePost />

			{posts.length === 0 && <Loader />}

			<Grid container spacing={4}>
				{posts.map((post) => {
					return <PostCard key={post.post_id} post={post} />;
				})}
			</Grid>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	isLoggedIn: state.isLoggedIn,
	fetchError: state.fetchError,
});
export default connect(mapStateToProps, { clearError, getUser })(Posts);
