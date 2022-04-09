const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = {
	name: 'twitter',
	aliases: ['twitter'],
	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Twitter')
			.setURL(collection.collectionTwitter)
			.setDescription(
				`Check out the ${collection.collectionName} twitter! ${collection.collectionTwitter}`,
			)
			.setImage(collection.collectionBanner)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
