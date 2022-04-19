const { MessageEmbed } = require('discord.js');
const collection = require('../../../collectionConfig.json');

module.exports = {
	name: 'get',
	aliases: ['lookup', 'search', 'find'],
	description: 'Get a specific NFT from the collection',
	usage: 'get <nftID>',
	category: 'collection',
	args: true,

	async execute(message, args) {
		// Set Variables
		const nftID = args[0];
		const collectionPrefix = collection.collectionPrefix;
		const websiteURL = `${collection.links.website}/details/${nftID}`;
		const stxnftURL = `${collection.links.marketplace.stxnft}/${nftID}`;
		const byzantionURL = `${collection.links.marketplace.byzantion}/${nftID}`;
		const imageURL = `${collection.nftImage.prefix}${nftID}.${collection.nftImage.imageType}`;

		// Conditionals
		if (args[0] > 0 && args[0] < 9999) {


			// Create Embed
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${collectionPrefix}${nftID}`)
				.addFields(
					{
						name: 'Official Website',
						value: `View at the official website: \n${websiteURL}`,
					},
					{
						name: 'STXNFT',
						value: `View at stxnft.com: \n${stxnftURL}`,
					},
					{
						name: 'BYZANTION',
						value: `View at byzantion.xyz: \n${byzantionURL}`,
					})
				.setImage(
					`${imageURL}`,
				)
				.setURL(`${websiteURL}`)
				.setTimestamp();


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
