import React from "react";
import { H6, Card, CardContent, Overline, Body2 } from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<Card bordered className={classes.card}>
			<CardContent>
				<H6 style={{ fontFamily: "Bebas Neue" }}>JustPost8</H6>
				<Body2>Developed by Hansel Valentine</Body2>
				<Overline style={{ marginBottom: "12px" }}>
					With React, Redux, MUI and UI-Neumorphism
				</Overline>
			</CardContent>
		</Card>
	);
};

export default Footer;
