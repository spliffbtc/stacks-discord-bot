const { MessageEmbed } = require('discord.js');

// Look up NFT and provide links to collection
module.exports = {
	name: 'get',
	aliases: ['lookup', 'search', 'find'],

	execute(message, args) {
		if (args[0] > 0 && args[0] < 9999) {
			punkID = args;
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('FreePunk #' + punkID)
				.setURL('https://byzantion.xyz/marketplace/free-punks-v0')
				.setImage(
					`https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk${punkID}.png`,
				)
				.addFields(
					{
						name: 'FreePunks Website',
						value: `View at freepunks.xyz: \n https://freepunks.xyz/details/${punkID}`,
					},

					{
						name: 'STXNFT',
						value: `View at stxnft.com: \n https://stxnft.com/collections/free-punks/${punkID}`,
					},

					{
						name: 'BYZANTION',
						value: `View at byzantion.xyz: \n https://byzantion.xyz/collection/free-punks-v0/${punkID}`,
					},
				);
			message.channel.send({ embeds: [embed] });

			return { embed };
		}
		else {
			message.channel.send('Please enter a valid FreePunk ID');
		}
	},
};
