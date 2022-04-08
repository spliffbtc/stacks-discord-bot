const { MessageEmbed } = require('discord.js');
const getCollection = require('../../model/collection.js');

// Look up NFT and provide links to collection
module.exports = {
	name: 'get',
	aliases: ['lookup', 'search', 'find'],

	execute(message, args) {
		if (args[0] > 0 && args[0] < 9999) {
			// Get Collection
			const collection = getCollection();
			const nftID = args;
			// Create MessageEmbed
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('FreePunk #' + nftID)
				.setURL(`https://byzantion.xyz/marketplace/${collection.contractName}`)
				.setImage(
					`https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk${nftID}.png`,
				)
				.addFields(
					{
						name: 'FreePunks Website',
						value: `View at freepunks.xyz: \n https://freepunks.xyz/details/${nftID}`,
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
			// Get Collection
			const collection = getCollection();
			// Send Message
			message.channel.send(`Please enter a valid ${collection.collectionName} ID`);
		}
	},
};
