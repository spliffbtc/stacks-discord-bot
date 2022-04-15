const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');

module.exports = {
	name: 'get',
	aliases: ['lookup', 'search', 'find'],
	description: 'Get a specific NFT from the collection',
	usage: 'get <nftID>',
	category: 'collection',
	args: true,

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
						value: `View at stxnft.com: \n ${collection.links.marketplace.stxnft}/${nftID}`,
					},
					{
						name: 'BYZANTION',
						value: `View at byzantion.xyz: \n ${collection.links.marketplace.byzantion}/${nftID}`,
					},
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
		}
		else {
			message.channel.send(`Please enter a valid ${collection.collectionName} ID`);
		}
	},
};
