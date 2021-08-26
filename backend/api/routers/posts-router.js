/* eslint-disable no-unused-vars */

const router = require("express").Router();
const Posts = require("../models/posts-model");
const Middleware = require("../middlewares/posts-middleware");
const { restricted } = require("../middlewares/auth-middleware");

router.get("/", (req, res, next) => {
	Posts.getAll()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch(next);
});

router.get("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Posts.getById(id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch(next);
});

router.post("/", restricted, Middleware.validateBody, (req, res, next) => {
	const body = req.body;
	Posts.add(body)
		.then((newPost) => {
			res.status(201).json(newPost);
		})
		.catch(next);
});

router.put(
	"/:id",
	restricted,
	Middleware.validateId,
	Middleware.validateBody,
	(req, res, next) => {
		const { id } = req.params;
		const body = req.body;
		Posts.update(id, body)
			.then((updated) => {
				res.status(200).json(updated);
			})
			.catch(next);
	},
);

router.delete("/:id", restricted, Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Posts.remove(id)
		.then((removed) => {
			res
				.status(200)
				.json({ message: "Post successfully deleted", post: removed });
		})
		.catch(next);
});

module.exports = router;
