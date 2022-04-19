const { MessageEmbed } = require('discord.js');
const getSTXUSD = require('../../util/coingeckoAPI/getSTXUSD');

module.exports = {
	name: 'stxprice',
	aliases: ['stxprice', 'stx-price'],
	description: 'Get the current price of STX in USD',
	usage: 'stxprice',
	category: 'market',
	args: false,

	async execute(message) {
		// Set Variables
		const STXUSD = await getSTXUSD();


		// Create Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('STX Price')
			.setDescription(`The current price of STX in USD is: **$${STXUSD}**`)
			.setThumbnail(
				'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
			)
			.setURL('https://www.coingecko.com/en/coins/stacks')
			.setTimestamp();


		// Send Message
		message.channel.send({ embeds: [embed] });


		// Logging
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			const args = module.exports.args;
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};