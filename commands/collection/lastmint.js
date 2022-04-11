const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');
const getLastMint = require('../../util/stacksAPI/nonFungibleTokens/getMint.js');

module.exports = {
	name: 'lastmint',
	aliases: ['lastmint'],
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
				`${collection.image.prefix}${lastMinted.nftID}.${collection.image.imageType}`,
			)
			.setURL(`${collection.collectionWebsite}/details/${lastMinted.nftID}`)
			.addFields(
				{
					name: `${collection.nftPrefix} #`,
					value: `${lastMinted.nftID}`,
				},
				{
					name: 'Minted By',
					value: `${lastMinted.recipient}`,
				},
				{
					name: 'Link',
					value: `${collection.collectionWebsite}/details/${lastMinted.nftID}`,
				},
			);
		message.channel.send({ embeds: [embed] });
	},
};
