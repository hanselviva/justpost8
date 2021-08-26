const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "fallback";

module.exports = function (user) {
	const payload = {
		subject: user.id,
		username: user.username,
		role: user.role_name,
	};
	const options = {
		expiresIn: "7d",
	};
	return jwt.sign(payload, secret, options);
};
