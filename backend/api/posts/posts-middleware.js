/* eslint-disable no-unused-vars */
const Posts = require("./posts-model");

const validateBody = async (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "Missing required text fields." });
	} else if (!body.post_title) {
		res.status(400).json({ message: "Title required." });
	} else if (!body.post_body) {
		res.status(400).json({ message: "Post content required." });
	} else if (!body.user_id) {
		res.status(400).json({ message: "OP required." });
	} else {
		req.body.post_title = body.post_title.trim();
		req.body.post_body = body.post_body.trim();
		next();
	}
};

//id validator:
const validateId = async (req, res, next) => {
	const { id } = req.params;
	Posts.getById(id)
		.then((post) => {
			if (post.length === 0) {
				res.status(404).json({ message: "No post found with that id." });
			} else {
				next();
			}
		})
		.catch(next);
};

module.exports = {
	validateBody,
	validateId,
};
