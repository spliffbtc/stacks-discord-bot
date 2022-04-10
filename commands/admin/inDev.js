module.exports = {
	name: 'dev',
	aliases: ['dev', 'inDev'],
	description: 'Template for commands that are in development',
	usage: 'dev',
	category: 'admin',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: false,
	cooldown: 5,
	execute(message) {
		message.channel.send({ content: 'In Development!' });
	},
};
