/* eslint-disable no-unused-vars */
const db = require("../../data/config-db");

const getAll = () => {
	return db("posts as p")
		.select("p.*", "u.username")
		.join("users as u", "p.user_id", "users.user_id")
		.orderBy("posted_at", "desc");
};

//get posts by user with user_id as filter
const getBy = (filter) => {
	return db("posts as p")
		.select("post_id", "post_title", "post_body", "post_at", "username")
		.join("users as u", "p.user_id", "u.user_id")
		.where(filter)
		.orderBy("posted_at", "desc");
};

const getById = (post_id) => {
	return db("posts").where({ post_id }).orderBy("posted_at", "desc");
};

const add = async (newPost) => {
	const [post_id] = await db("posts").insert(newPost);
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
