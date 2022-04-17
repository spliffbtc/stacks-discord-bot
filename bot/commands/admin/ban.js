module.exports = {
	name: 'ban',
	aliases: ['ban'],
	description: 'Bans a user from the server',
	usage: 'ban <user> <reason>',
	category: 'admin',
	args: true,
	adminOnly: true,

	execute(message) {
		message.channel.send({ content: 'in dev' });
	},
};
