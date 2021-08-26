exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("posts")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("posts").insert([
				{
					post_title: "I'm not an idiot.",
					post_body:
						"Whenever I'm about to do something, I think 'Would an idiot do that?' And if they would, I do not do that thing.",
					user_id: 1,
				},
				{
					post_title: "Dwight is driving me crazy.",
					post_body:
						"He has not stopped working…for a second. At 12:45, he sneezed, while keeping his eyes open, which I always thought was impossible. At 1:32 he peed. And I know that because he did that in an open soda bottle, under the desk, while filling out expense reports. And on the flip side, I’ve been so busy watching him that I haven’t even started work. It’s exhausting, being this vigilant. I’ll probably have to go home early today.",
					user_id: 2,
				},
				{
					post_title: "Who created wikipedia?",
					post_body:
						"Wikipedia is the best thing ever. Anyone in the world can write anything they want about any subject. So you know you are getting the best possible information",
					user_id: 3,
				},

				{
					post_title: "Yep",
					post_body:
						"ONCE EVERY HOUR, SOMEONE IS INVOLVED IN AN INTERNET SCAM. That man is Michael Scott. He’s supporting about twenty Nigerian princesses.",
					user_id: 4,
				},
				{
					post_title: "I am not comfortable with this",
					post_body:
						"Voodoo Mama Juju, the witch doctor of the Savannah swamps? Really?",
					user_id: 5,
				},
				{
					post_title: "My take on chafing",
					post_body:
						"I'm petrified of nipple chafing. One it starts, it's a vicious circle. You have sensitive nipples, they chafe, so they become more sensitive, so they chafe more. It's a tough one. Gotta take precautions.",
					user_id: 6,
				},

				{
					post_title: "Give us answers!",
					post_body:
						"The Dunder Mifflin stock symbol is DMI. Do you know what that stands for? Dummies, morons and idiots. Because that's what you'd have to be to own it. And, as one of those idiots, I believe the board owes me answers.",
					user_id: 7,
				},

				{
					post_title: "Dwight doesn't understand what a silent auction is",
					post_body:
						"Sometimes I feel like everyone I work with is an idiot. And by sometimes, I mean all times. All the time.",
					user_id: 8,
				},

				{
					post_title: "Pregnant women",
					post_body:
						"I do not like pregnant women in my workspace. They’re always complaining. I have varicose veins, too. I have swollen ankles. I’m constantly hungry. Do you think my nipples don’t get sore too? Do you think I don’t need to know the fastest way to the hospital?",
					user_id: 9,
				},

				{
					post_title: "Their portrayal of me was not accurate.",
					post_body:
						"I got a beef with that. Um, for the first seven years, I was getting my PhD in School Psychology and they didn't show it. Yes, I was getting hammered but, hey, it was college.",
					user_id: 10,
				},
			]);
		});
};
