const server = require("./api/server");
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(
		`\n ___________  \n Listening on port ${PORT}... \n ___________ \n `,
	);
});
