const { MessageEmbed } = require('discord.js');
const getCollection = require('../../model/collection.js');
const collection = getCollection();

// Look up NFT and provide links to collection
module.exports = {
	name: 'get',
	aliases: ['lookup', 'search', 'find'],

	execute(message, args) {
		if (args[0] > 0 && args[0] < 9999) {
			const nftID = args;
			// Create MessageEmbed
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('FreePunk #' + nftID)
				.setURL(`${collection.collectionWebsite}/details/${nftID}`)
				.setImage(
					`https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk${nftID}.png`,
				)
				.addFields(
					{
						name: 'FreePunks Website',
						value: `View at freepunks.xyz: \n ${collection.collectionWebsite}/details/${nftID}`,
					},

					{
						name: 'STXNFT',
						value: `View at stxnft.com: \n https://stxnft.com/collections/${collection.contractNameAlt}/${nftID}`,
					},

					{
						name: 'BYZANTION',
						value: `View at byzantion.xyz: \n https://byzantion.xyz/collection/${collection.contractName}/${nftID}`,
					},
				);
				// Send MessageEmbed
			message.channel.send({ embeds: [embed] });

			return { embed };
		}
		else {
			// Send Message
			message.channel.send(`Please enter a valid ${collection.collectionName} ID`);
		}
	},
};
