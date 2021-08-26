/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routers/auth-router");
const adminRouter = require("./routers/admin-access-router.js");
const postsRouter = require("./router/posts-router.js");

const server = express();
server.use(morgan("dev"));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/posts", postsRouter);
server.use("/auth", authRouter);
server.use("/admin-access", adminRouter); //users and posts info

//root
server.get("/", (req, res) => {
	res.send(`<h2> Welcome to my API Homepage! </h2>`);
});

// catch all
server.use("*", (req, res) => {
	res
		.status(404)
		.send(
			`<h2> oops! that place doesn't exist! Read docs for more info. </h2>`,
		);
});

//error
server.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = server;
