/* eslint-disable no-unused-vars */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./auth/auth-router.js");
const adminRouter = require("./admin-access/admin-access-router.js");
const postsRouter = require("./posts/posts-router.js");

const server = express();
server.use(morgan("dev"));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/posts", postsRouter);
server.use("/auth", authRouter);
server.use("/admin-access", adminRouter); //users and posts info

// catch all
server.use("*", (req, res) => {
	res
		.status(404)
		.send(
			`<h2> oops! that place doesn't exist! Read docs for more info. </h2>`,
		);
});

//root
server.get("/", (req, res) => {
	res.send(`<h2> Welcome to my API Homepage! </h2>`);
});

//catch all
server.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = server;
