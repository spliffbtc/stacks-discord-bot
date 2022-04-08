const { MessageEmbed } = require('discord.js');

// Link to collection on Byzantion
module.exports = {
	name: 'byzantion',
	aliases: ['byz', 'byznation'],
	execute(message, args) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Byzantion')
			.setURL('https://byzantion.xyz/marketplace/free-punks-v0')
			.setDescription(
				'Check out the FreePunks collection on Byzantion! https://byzantion.xyz/marketplace/free-punks-v0',
			)
			.setImage('https://freepunks.xyz/assets/unknownxx.png')
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
