const { MessageEmbed } = require('discord.js');
let collection = require('../../model/collection.js');
collection = collection();

// Link to collection website
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
