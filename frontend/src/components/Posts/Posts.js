import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

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
}));

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		axios
			.get("https://justpost8-api.herokuapp.com/posts")
			.then((res) => {
				setPosts(res.data);
				// console.log("posts", res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<Container className={classes.cardGrid} maxWidth="lg">
			<CreatePost />

			<Grid container spacing={4}>
				{posts.map((post) => {
					return <PostCard key={post.post_id} post={post} />;
				})}
			</Grid>
		</Container>
	);
};

export default Posts;
