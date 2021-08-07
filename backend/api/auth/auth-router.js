/* eslint-disable no-unused-vars */

const router = require("express").Router();
const Users = require("../admin-access/users-model");
const Middleware = require("./auth-middleware"); //! NOT INTEGRATED YET

router.post("/register", async (req, res, next) => {
	const credentials = req.body;

	//add user to db
	Users.add(credentials)
		.then((newUser) => {
			res.status(201).json({
				message: `Welcome, ${credentials.username}`,
				user: newUser,
			});
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post("/login", async (req, res, next) => {
	const credentials = req.body;
	const [user] = await Users.getBy({ username: credentials.username });

	res.status(200).json(user);
});

router.post("/admin-register", async (req, res, next) => {
	let credentials = req.body;
	credentials.role_id = 1;

	Users.add(credentials)
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch((err) => {
			res.json(err);
		});
});

//error handler:
router.use((err, req, res, next) => {
	const message = err?.message || "Something went wrong in the AUTH router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
