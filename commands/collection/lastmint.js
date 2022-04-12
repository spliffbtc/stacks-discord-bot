const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');
const getLastMint = require('../../util/stacksAPI/nonFungibleTokens/getMint.js');

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
			.setTitle('Last Minted: #' + lastMinted.nftID)
			.setImage(
				`${collection.nftImage.prefix}${lastMinted.nftID}.${collection.nftImage.imageType}`,
			)
			.setURL(`${collection.links.website}/details/${lastMinted.nftID}`)
			.addFields(
				{
					name: `${collection.collectionPrefix} #`,
					value: `${lastMinted.nftID}`,
				},
				{
					name: 'Minted By',
					value: `${lastMinted.recipient}`,
				},
				{
					name: 'Link',
					value: `${collection.links.website}/details/${lastMinted.nftID}`,
				},
			);
		// Send Message
		// Send Message
		message.channel.send({ embeds: [embed] });
		// logging
		console.log(embed);
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name} with the following arguments: ${message.content.slice(message.content.indexof(' ') + 1)}`);
		}
		// Logging
		console.log(embed);
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name} with the following arguments: ${message.content.slice(message.content.indexOf(' ') + 1)}`);
		}
	},
};
