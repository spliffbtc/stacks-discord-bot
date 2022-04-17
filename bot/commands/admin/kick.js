module.exports = {
	name: 'kick',
	aliases: ['kick'],
	description: 'Kicks a user from the server',
	usage: 'kick <user> <reason>',
	category: 'admin',
	args: true,
	adminOnly: true,

	execute(message) {
		message.channel.send({ content: 'in dev' });
	},
};
