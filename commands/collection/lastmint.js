const { MessageEmbed } = require('discord.js');
const getLastMint = require('../../util/stacksAPI/getLastMint.js');
const getCollection = require('../../model/collection.js');
const collection = getCollection();

module.exports = {
	name: 'lastmint',
	aliases: ['lastminted', 'last'],
	async execute(message) {
		const lastMinted = await getLastMint();
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Last Minted: #' + lastMinted.nftID)
			.setImage(
				`https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk${lastMinted.nftID}.png`,
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
