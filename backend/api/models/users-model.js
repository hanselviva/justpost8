/* eslint-disable no-unused-vars */
const db = require("../../data/config-db");

const getAll = () => {
	return db("users as u")
		.join("roles as r", "u.role_id", "r.role_id")
		.select("u.user_id", "u.username", "r.role_name");
};

const getBy = (filter) => {
	return db("users as u")
		.join("roles as r", "u.role_id", "r.role_id")
		.select("u.user_id", "u.username", "u.password", "r.role_name")
		.where(filter)
		.orderBy("user_id");
};

const getById = (user_id) => {
	return db("users as u")
		.join("roles as r", "u.role_id", "r.role_id")
		.select("u.user_id", "u.username", "r.role_name")
		.where({ user_id });
};

const add = async (newUser) => {
	const [user_id] = await db("users").returning("user_id").insert(newUser);
	const newlyAddedUser = await getById(user_id);
	return newlyAddedUser;
};

const update = async (user_id, user) => {
	const idOfUser = await db("users").where({ user_id }).update(user);
	const updatedUser = await getById(user_id);
	return updatedUser;
};

const remove = async (user_id) => {
	const removed = await getById(user_id);
	const toRemove = await db("users").where({ user_id }).del();
	return removed;
};

module.exports = {
	getAll,
	getBy,
	getById,
	add,
	update,
	remove,
};
