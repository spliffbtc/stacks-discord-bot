const { MessageEmbed } = require('discord.js');
const getTokens = require('../../util/stacksAPI/nonFungibleTokens/getTokens.js');
const getAddress = require('../../util/stacksAPI/names/getAddress.js');
const getBNS = require('../../util/stacksAPI/names/getBNS.js');

module.exports = {
	name: 'total',
	aliases: ['totalcount'],
	description: 'Get the total count of tokens for the address',
	usage: 'address',
	category: 'collection',
	args: true,

	async execute(message, args) {
		const input = args[0];
		const address = await getAddress(input);
		const bns = await getBNS(address);
		const stxWallet = bns;
		const tokenCount = await getTokens(address);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${stxWallet} has ${tokenCount} tokens`)
			.setDescription(
				`${stxWallet} has ${tokenCount} tokens.`,
			);
		// Send Message
		message.channel.send({ embeds: [embed] });
		// Logging
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};
