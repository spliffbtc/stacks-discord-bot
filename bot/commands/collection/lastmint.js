const { MessageEmbed } = require('discord.js');
const collection = require('../../../collectionConfig.json');
const getLastMint = require('../../util/stacksAPI/nonFungibleTokens/get-mint.js');

module.exports = {
	name: 'lastmint',
	aliases: ['lastmint', 'last'],
	description: 'Get the last minted NFT in the collection',
	usage: 'lastmint',
	category: 'collection',
	args: false,

	async execute(message) {
		const lastMinted = await getLastMint();
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Last Minted')
			.setImage(
				`${collection.nftImage.prefix}${lastMinted.nftID}.${collection.nftImage.imageType}`,
			)
			.setURL(`${collection.links.website}/details/${lastMinted.nftID}`)
			.setDescription(
				`[${collection.collectionPrefix}${lastMinted.nftID}](${collection.links.website}/details/${lastMinted.nftID}) by ${lastMinted.recipient}`)
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
