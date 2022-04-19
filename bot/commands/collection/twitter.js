const { MessageEmbed } = require('discord.js');
const collection = require('../../../collectionConfig.json');

module.exports = {
	name: 'twitter',
	aliases: ['twitter'],
	description: 'Get the Twitter account for the collection',
	usage: 'twitter',
	category: 'collection',
	args: false,

	execute(message) {
		// Set Variables
		const collectionName = collection.collectionName;
		const collectionBanner = collection.collectionBanner;
		const twitterURL = collection.twitterURL;


		// Create Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Twitter')
			.setURL(twitterURL)
			.setDescription(
				`Check out the ${collectionName} twitter! ${twitterURL}`,
			)
			.setImage(collectionBanner)
			.setTimestamp();


		// Send Message
		message.channel.send({ embeds: [embed] });


		// Logging
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			const args = module.exports.args;
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}

		return { embed };
	},
};
