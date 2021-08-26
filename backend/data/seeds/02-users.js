exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{ username: "dwightDangerSchrute", password: "1234", role_id: 2 },
				{ username: "bigTunaJim", password: "1234", role_id: 2 },
				{ username: "michaelScarn", password: "1234", role_id: 2 },
				{ username: "pamalamaDingdong", password: "1234", role_id: 2 },
				{ username: "voodooMamaJuju", password: "1234", role_id: 2 },
				{ username: "theNardDog", password: "1234", role_id: 2 },
				{ username: "cSpan", password: "1234", role_id: 2 },
				{ username: "ashtonKutcher", password: "1234", role_id: 2 },
				{ username: "stanleyTheManly", password: "1234", role_id: 2 },
				{ username: "maryBeth", password: "1234", role_id: 2 },
			]);
		});
};
