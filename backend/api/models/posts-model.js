/* eslint-disable no-unused-vars */
const db = require("../../data/config-db");

const getAll = () => {
	return db("posts as p")
		.select("p.*", "u.username")
		.join("users as u", "p.user_id", "u.user_id")
		.orderBy("post_id", "desc");
};

const getBy = (filter) => {
	return db("posts as p")
		.select("post_id", "post_title", "post_body", "posted_at", "username")
		.join("users as u", "p.user_id", "u.user_id")
		.where(filter)
		.orderBy("post_id", "desc");
};

const getById = (post_id) => {
	return db("posts").where({ post_id }).orderBy("post_id", "desc");
};

const add = async (newPost) => {
	const [post_id] = await db("posts").returning("post_id").insert(newPost);
	const newlyAddedPost = await getById(post_id);
	return newlyAddedPost;
};

const update = async (post_id, post) => {
	const idOfPost = await db("posts").where({ post_id }).update(post);
	const updatedPost = await getById(post_id);
	return updatedPost;
};

const remove = async (post_id) => {
	const removed = await getById(post_id);
	const toRemove = await db("posts").where({ post_id }).del();
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
