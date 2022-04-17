module.exports = {
	name: 'ready',
	once: true,
	execute(args, client, logger) {
		// Set username and presence
		client.user.setUsername('StacksBot');
		client.user.setPresence({ activities: [{ type: 'PLAYING', name: 'with stacks.js' }], status: 'online' });
		// Log Response
		logger.info(`Bot is ${client.user.presence.status} as ${client.user.tag}!`);
	},
};
