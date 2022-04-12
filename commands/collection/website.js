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
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name} with the following arguments: ${message.content.slice(message.content.indexof(' ') + 1)}`);
		}

		return { embed };
	},
};
