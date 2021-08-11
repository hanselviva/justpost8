/* eslint-disable no-unused-vars */

const router = require("express").Router();
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const { restricted, only, validateId } = require("../auth/auth-middleware");

router.get("/get-users", restricted, only("admin"), (req, res, next) => {
	Users.getAll()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(next);
});

router.get("/get-users/:id", validateId, (req, res, next) => {
	const { id } = req.params;
	Users.getById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(next);
});

router.delete(
	"/:id",
	restricted,
	only("admin"),
	validateId,
	(req, res, next) => {
		const { id } = req.params;
		Users.remove(id)
			.then((removedUser) => {
				res
					.status(200)
					.json({ message: "Successfully removed.", removed: removedUser });
			})
			.catch(next);
	},
);

//error handler:
router.use((err, req, res, next) => {
	const message = err?.message || "Something went wrong in the Admin router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
