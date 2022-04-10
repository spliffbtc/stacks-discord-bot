module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Bot logged in as ${client.user.tag}`);
	},
};