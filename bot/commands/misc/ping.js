module.exports = {
	name: 'ping',
	aliases: ['ping'],
	description: 'Ping the bot',
	usage: 'ping',
	category: 'misc',
	args: false,

	execute(message) {
		// Send Message
		message.channel.send({ content: 'Pong.' });
	},
};
