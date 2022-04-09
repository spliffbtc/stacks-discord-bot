module.exports = {
	name: 'ping',
	aliases: ['ping'],
	description: 'Ping the bot',
	usage: 'ping',
	category: 'misc',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: false,
	cooldown: 5,
	execute(message) {
		message.channel.send({ content: 'Pong.' });
	},
};
