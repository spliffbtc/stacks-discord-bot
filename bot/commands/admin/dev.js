module.exports = {
	name: 'dev',
	aliases: ['dev', 'inDev'],
	description: 'Template for commands that are in development',
	usage: 'dev',
	category: 'admin',
	args: false,
	adminOnly: true,

	execute(message) {
		message.channel.send({ content: 'in dev' });
	},
};
