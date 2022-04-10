const { MessageEmbed } = require('discord.js');
const getTokens = require('../../util/stacksAPI/getTokens');

module.exports = {
	name: 'total',
	aliases: ['totalcount'],
	description: 'Get the total count of tokens for the address',
	usage: 'address',
	category: 'collection',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const address = args;
		const tokenCount = await getTokens(address);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${address} has ${tokenCount} tokens`)
			.setDescription(
				`${args} has ${tokenCount} tokens.`,
			);
		message.channel.send({ embeds: [embed] });
	},
};
