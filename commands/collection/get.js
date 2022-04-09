const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = {
	name: 'get',
	description: 'Get a specific NFT from the collection',
	aliases: ['lookup', 'search', 'find'],
	async execute(message, args) {
		const nftID = args[0];
		if (args[0] > 0 && args[0] < 9999) {
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${collection.nftPrefix} # ${nftID}`)
				.setURL(`${collection.collectionWebsite}/details/${nftID}`)
				.setImage(
					`${collection.image.prefix}${nftID}.${collection.image.imageType}`,
				)
				.addFields(
					{
						name: 'Official Website',
						value: `View at the official website: \n ${collection.collectionWebsite}/details/${nftID}`,
					},
					{
						name: 'STXNFT',
						value: `View at stxnft.com: \n /${collection.marketplaceWebsite.STXNFT}/${nftID}`,
					},
					{
						name: 'BYZANTION',
						value: `View at byzantion.xyz: \n ${collection.marketplaceWebsite.byzantion}/${nftID}`,
					},
				);
			message.channel.send({ embeds: [embed] });
		}
		else {
			message.channel.send(`Please enter a valid ${collection.collectionName} ID`);
		}
	},
};
