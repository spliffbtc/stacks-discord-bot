const { MessageEmbed } = require('discord.js');

// Link to collection on Byzantion
module.exports = {
	name: 'marketplace',
	aliases: ['market', 'byz', 'byznation', 'stxnft'],
	execute(message, args) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Marketplace')
			.addFields(
				{
					name: 'STXNFT',
					value: 'View at stxnft.com: \n https://stxnft.com/collections/free-punks',
				},
				{
					name: 'BYZANTION',
					value: 'View at byzantion.xyz: \n https://byzantion.xyz/collection/free-punks-v0',
				},
			)
			.setImage('https://freepunks.xyz/assets/unknownxx.png')
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
