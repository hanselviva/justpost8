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

const checkUsernameExists = (req, res, next) => {
	const username = req.body.username;
	Users.getBy({ username })
		.then((userFound) => {
			if (userFound) {
				next();
			} else {
				res.status(401).json({ message: "Username doesn't exist" });
			}
		})
		.catch(next);
};

module.exports = {
	restricted,
	only,
	checkUsernameExists,
};
