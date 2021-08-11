exports.up = function (knex) {
	return knex.schema
		.createTable("roles", (roles) => {
			roles.increments("role_id");
			roles.string("role_name", 16).notNullable();
		})
		.createTable("users", (users) => {
			users.increments("user_id");
			users.string("username", 32).notNullable().unique();
			users.string("password").notNullable();
			users
				.integer("role_id")
				.defaultTo(2)
				.unsigned()
				.references("role_id")
				.inTable("roles")
				.onUpdate("RESTRICT")
				.onDelete("RESTRICT");
		})
		.createTable("posts", (posts) => {
			posts.increments("post_id");
			posts.string("post_title").notNullable();
			posts.string("post_body").notNullable();
			posts.timestamp("posted_at").defaultTo(knex.fn.now());
			posts
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("user_id")
				.inTable("users")
				.onUpdate("RESTRICT")
				.onDelete("RESTRICT");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("posts")
		.dropTableIfExists("users")
		.dropTableIfExists("roles");
};
