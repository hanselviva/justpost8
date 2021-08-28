import React from "react";
import {
	H5,
	Card,
	CardContent,
	Body1,
	CardAction,
	Button,
	Overline,
} from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
}));

const PostCard = (props) => {
	const { post } = props;
	const classes = useStyles();

	const convertDate = (timestamp) => {
		return timestamp.substring(0, 10);
	};

	return (
		<Grid item key={post.post_id} xs={12} sm={6} md={4}>
			<Card bordered className={classes.card}>
				<CardContent>
					<H5 style={{ fontFamily: "Questrial" }}>{post.post_title}</H5>
					<Overline style={{ marginBottom: "12px" }}>
						Posted at: {convertDate(post.posted_at)} by {post.user_id}
					</Overline>
					<Body1
						style={{
							marginTop: "20px",
							fontFamily: "Sarabun",
						}}
					>
						{post.post_body}
					</Body1>
				</CardContent>
				<CardAction style={{ marginBottom: "20px" }}>
					<Button text color="var(--primary)" outlined>
						Visit profile
					</Button>
				</CardAction>
			</Card>
		</Grid>
	);
};

export default PostCard;
