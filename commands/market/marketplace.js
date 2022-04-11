const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');

module.exports = {
	name: 'marketplace',
	aliases: ['market', 'byz', 'byznation', 'stxnft'],
	description: 'Get the current floor price of the collection',
	usage: 'marketplace',
	category: 'market',
	args: false,

	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Marketplace')
			.addFields(
				{
					name: 'STXNFT',
					value: `View at stxnft.com: \n ${collection.marketplaceWebsite.stxnft}`,
				},
				{
					name: 'BYZANTION',
					value: `View at byzantion.xyz: \n ${collection.marketplaceWebsite.byzantion}`,
				},
			)
			.setImage(`${collection.collectionBanner}`)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};
