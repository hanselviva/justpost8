import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	H5,
	Card,
	CardContent,
	Subtitle2,
	Body1,
	CardAction,
	Button,
} from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	cardWrapper: {},
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
				console.log("posts", res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	const convertDate = (timestamp) => {
		return timestamp.substring(0, 10);
	};

	return (
		<Container className={classes.cardGrid} maxWidth="lg">
			<Grid container spacing={4}>
				{posts.map((post) => {
					return (
						<Grid
							className={classes.cardWrapper}
							item
							key={post.post_id}
							xs={12}
							sm={6}
							md={4}
						>
							<Card bordered className={classes.card}>
								<CardContent>
									<H5>{post.post_title}</H5>
									<Subtitle2 secondary style={{ marginBottom: "12px" }}>
										Posted at: {convertDate(post.posted_at)} by {post.user_id}
									</Subtitle2>
									<Body1>{post.post_body}</Body1>
								</CardContent>
								<CardAction>
									<Button text color="var(--primary)">
										Learn More
									</Button>
								</CardAction>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};

export default Posts;
