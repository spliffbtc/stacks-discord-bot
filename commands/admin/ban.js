module.exports = {
	name: 'ban',
	aliases: ['ban'],
	description: 'Bans a user from the server',
	usage: 'ban <user> <reason>',
	category: 'admin',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: false,
	cooldown: 5,
	execute(message) {
		message.channel.send({ content: 'in dev' });
	},
};
