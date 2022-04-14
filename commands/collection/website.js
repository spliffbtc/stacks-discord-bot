const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');

module.exports = {
	name: 'website',
	aliases: ['website'],
	description: 'Get the website for the collection',
	usage: 'website',
	category: 'collection',
	args: false,

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
		// Send Message
		message.channel.send({ embeds: [embed] });
		// Logging
		if (module.exports.args === false) {
			logger.info(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			logger.info(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}

		return { embed };
	},
};
