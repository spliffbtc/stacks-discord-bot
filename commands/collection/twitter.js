const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');

module.exports = {
	name: 'twitter',
	aliases: ['twitter'],
	description: 'Get the Twitter account for the collection',
	usage: 'twitter',
	category: 'collection',
	args: false,

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
		// Send Message
		message.channel.send({ embeds: [embed] });
		// Logging
		if (module.exports.args === false) {
			logger.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			logger.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}

		return { embed };
	},
};
