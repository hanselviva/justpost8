import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearError, getUser } from "../../actions/index";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostCard from "../Posts/PostCard";
import CreatePost from "../Posts/CreatePost";

const useStyles = makeStyles((theme) => ({
	container: {
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

const Profile = (props) => {
	const [posts, setPosts] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		props.clearError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.clearError]);

	useEffect(() => {
		props.getUser(localStorage.getItem("user_id"));
		axios
			.get(
				`https://justpost8-api.herokuapp.com/auth/users/${localStorage.getItem(
					"user_id",
				)}/posts`,
			)
			.then((res) => {
				setPosts(res.data);
				console.log("fetch all user posts", res.data);
			})
			.catch((err) => {
				console.log("fetching user posts error ", err.response.data.message);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container className={classes.container} maxWidth="lg">
			<img
				className={classes.avatar}
				alt={props.user?.username}
				src={`https://robohash.org/${props.user?.username}`}
			/>

			<CreatePost />

			{Object.keys(posts).length === 0 && <h1> you have no posts</h1>}

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
	user: state.user,
});
export default connect(mapStateToProps, { getUser, clearError })(Profile);
