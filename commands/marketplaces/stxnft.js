const { MessageEmbed, Client, Message } = require('discord.js');
let stacksAPI = require('../../util/stacksAPI.js');
stacksAPI = stacksAPI();
let collection = require('../../model/collection.js');
collection = collection();
// Link to collection on STXNFT
module.exports = {
	name: 'stxnft',
	aliases: ['STXNFT', 'StxNFT', 'stxnft', 'StxNFT'],
	execute(message, client, args) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('STXNFT')
			.setURL(collection.marketplaceWebsite.STXNFT)
			.setDescription(
				`Check out the ${collection.collectionName} collection on STXNFT! ${collection.marketplaceWebsite.STXNFT}`,
			)
			.setImage(collection.collectionBanner)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
