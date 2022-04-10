module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		// Set username and presence
		client.user.setUsername('StacksBot');
		client.user.setPresence({ activities: [{ type: 'PLAYING', name: 'with stacks.js' }], status: 'online' });
		// Log Response
		console.log(`Bot is ${client.user.presence.status} as ${client.user.tag}!`);
	},
};
