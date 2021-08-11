/* eslint-disable no-unused-vars */

const jwt = require("jsonwebtoken");
const Users = require("../admin-access/users-model");

const secret = process.env.JWT_SECRET || "fallback";

const restricted = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		res.status(401).json({ message: "Token required." });
	} else {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: err });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	}
};

const only = (role_name) => (req, res, next) => {
	const decodedRole = req.decodedToken?.role;
	if (decodedRole === role_name) {
		next();
	} else {
		res
			.status(403)
			.json({ message: "Only admins have access to this information." });
	}
};

const checkUsernameExists = async (req, res, next) => {
	const username = req.body.username;
	const [userFound] = await Users.getBy({ username: username });
	if (userFound) {
		next();
	} else {
		res.status(401).json({ message: "Username doesn't exist." });
	}
};

const checkUsernameAvailable = async (req, res, next) => {
	const username = req.body.username;
	const [userFound] = await Users.getBy({ username: username });
	if (userFound) {
		res.status(401).json({ message: "Username already taken." });
	} else {
		next();
	}
};

const validateBody = async (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "Missing required text fields." });
	} else if (!body.username) {
		res.status(400).json({ message: "Username required." });
	} else if (!body.password) {
		res.status(400).json({ message: "Password required." });
	} else if (typeof body.password !== "string") {
		res.status(400).json({ message: "Password should be alphanumeric." });
	} else {
		req.body.username = body.username.trim();
		req.body.password = body.password.trim();
		next();
	}
};

//id validator:
const validateId = async (req, res, next) => {
	const { id } = req.params;
	Users.getById(id)
		.then((user) => {
			if (user.length === 0) {
				res.status(404).json({ message: "User with that ID not found." });
			} else {
				next();
			}
		})
		.catch(next);
};

module.exports = {
	restricted,
	only,
	checkUsernameExists,
	checkUsernameAvailable,
	validateBody,
	validateId,
};
