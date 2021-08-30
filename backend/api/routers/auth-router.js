/* eslint-disable no-unused-vars */

const router = require("express").Router();
const Users = require("../models/users-model");
const Posts = require("../models/posts-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("../utils/token-builder");

const Middleware = require("../middlewares/auth-middleware");
const { validateId } = require("../middlewares/auth-middleware");

router.post(
	"/register",
	Middleware.validateBody,
	Middleware.checkUsernameAvailable,
	async (req, res, next) => {
		const credentials = req.body;
		const rounds = process.env.BCRYPT_ROUNDS || 8;
		const hash = bcrypt.hashSync(credentials.password, rounds);
		credentials.password = hash;

		//add user to db
		Users.add(credentials)
			.then((newUser) => {
				res.status(201).json(newUser);
			})
			.catch(next);
	},
);

router.post(
	"/login",
	Middleware.validateBody,
	Middleware.checkUsernameExists,
	async (req, res, next) => {
		const { username, password } = req.body;
		const [user] = await Users.getBy({ username: username });

		if (user && !bcrypt.compareSync(password, user.password)) {
			res.status(401).json({ message: "Incorrect password" });
		} else if (user && bcrypt.compareSync(password, user.password)) {
			const token = tokenBuilder(user);
			res.json({
				user,
				token,
			});
		} else {
			next();
		}
	},
);

router.post(
	"/admin-register",
	Middleware.validateBody,
	Middleware.checkUsernameAvailable,
	async (req, res, next) => {
		const credentials = req.body;
		const rounds = process.env.BCRYPT_ROUNDS || 8;
		const hash = bcrypt.hashSync(credentials.password, rounds);
		credentials.password = hash;
		credentials.role_id = 1;

		Users.add(credentials)
			.then((newUser) => {
				res.status(201).json(newUser);
			})
			.catch((err) => {
				res.json(err);
			});
	},
);

//get all posts by user
router.get("/users/:id/posts", validateId, async (req, res, next) => {
	const { id } = req.params;
	const grabUser = await Users.getById(id).returning("user_id");
	Posts.getBy({ "p.user_id": grabUser[0].user_id })
		.then((response) => res.status(200).res.json(response))
		.catch(next);
});

router.get("/users/:id", validateId, (req, res, next) => {
	const { id } = req.params;
	Users.getById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(next);
});

//edit user profile

//error handler:
router.use((err, req, res, next) => {
	const message = err?.message || "Something went wrong in the AUTH router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
