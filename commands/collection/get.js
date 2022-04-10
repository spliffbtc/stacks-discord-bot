const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = {
	name: 'get',
	aliases: ['lookup', 'search', 'find'],
	description: 'Get a specific NFT from the collection',
	usage: 'get <nftID>',
	category: 'collection',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const nftID = args[0];
		if (args[0] > 0 && args[0] < 9999) {
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${collection.collectionPrefix}${nftID}`)
				.setURL(`${collection.links.website}/details/${nftID}`)
				.setImage(
					`${collection.nftImage.prefix}${nftID}.${collection.nftImage.imageType}`,
				)
				.addFields(
					{
						name: 'Official Website',
						value: `View at the official website: \n ${collection.links.website}/details/${nftID}`,
					},
					{
						name: 'STXNFT',
						value: `View at stxnft.com: \n ${collection.links.marketplace.STXNFT}/${nftID}`,
					},
					{
						name: 'BYZANTION',
						value: `View at byzantion.xyz: \n ${collection.links.marketplace.byzantion}/${nftID}`,
					},
				);
			message.channel.send({ embeds: [embed] });
		}
		else {
			message.channel.send(`Please enter a valid ${collection.collectionName} ID`);
		}
	},
};
