const { MessageEmbed } = require('discord.js');
const getSTXUSD = require('../../util/coingeckoAPI/getSTXUSD');

module.exports = {
	name: 'stxprice',
	aliases: ['stxprice', 'stx-price'],
	description: 'Get the current price of STX in USD',
	usage: 'stxprice',
	category: 'market',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: false,
	cooldown: 5,
	async execute(message) {
		const STXUSD = await getSTXUSD();
		const embed = new MessageEmbed()

			.setColor('#0099ff')
			.setTitle('STX Price')
			.setURL('https://www.coingecko.com/en/coins/stacks')
			.setDescription(`The current price of STX in USD is: **$${STXUSD}**`)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};