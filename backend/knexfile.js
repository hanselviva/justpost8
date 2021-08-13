module.exports = {
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/database_file.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			},
		},
	},
	testing: {},
	staging: {},
	production: { client: "pg" },
};
