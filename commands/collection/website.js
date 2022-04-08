const { MessageEmbed } = require('discord.js');
const getCollection = require('../../model/collection.js');
const collection = getCollection();

module.exports = {
	name: 'website',
	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Website')
			.setURL(collection.collectionWebsite)
			.setDescription(
				`Check out the ${collection.collectionName} website! ${collection.collectionWebsite}`,
			)
			.setImage(collection.collectionBanner)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
