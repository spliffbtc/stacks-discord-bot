const { MessageEmbed } = require('discord.js');
const collection = require('../../../collectionConfig.json');

module.exports = {
	name: 'marketplace',
	aliases: ['market', 'byz', 'byznation', 'stxnft'],
	description: 'Get links to the collection page at top marketplaces',
	usage: 'marketplace',
	category: 'market',
	args: false,

	execute(message) {
		// Set Variables
		const stxnftURL = collection.links.marketplace.stxnft;
		const byzantionURL = collection.links.marketplace.byzantion;
		const collectionBanner = collection.collectionBanner;

		// Create Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Marketplace')
			.addFields(
				{
					name: 'STXNFT',
					value: `View at stxnft.com: \n${stxnftURL}`,
				},
				{
					name: 'BYZANTION',
					value: `View at byzantion.xyz: \n${byzantionURL}`,
				},
			)
			.setImage(`${collectionBanner}`)
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
