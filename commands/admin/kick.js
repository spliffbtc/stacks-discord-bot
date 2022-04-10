module.exports = {
	name: 'kick',
	aliases: ['kick'],
	description: 'Kicks a user from the server',
	usage: 'kick <user> <reason>',
	category: 'admin',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: false,
	cooldown: 5,
	execute(message) {
		message.channel.send({ content: 'in dev' });
	},
};
