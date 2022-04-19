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
		// Set Variables
		const lastMinted = await getLastMint();
		const nftID = lastMinted.nftID;
		const recipient = lastMinted.recipient;
		const collectionPrefix = collection.collectionPrefix;
		const websiteURL = `${collection.links.website}/details/${nftID}`;
		const imageURL = `${collection.nftImage.prefix}${lastMinted.nftID}.${collection.nftImage.imageType}`;


		// Create Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Last Minted')
			.setImage(
				`${imageURL}`,
			)
			.setURL(`${websiteURL}`)
			.setDescription(
				`[${collectionPrefix}${nftID}](${websiteURL}) by ${recipient}`)
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
