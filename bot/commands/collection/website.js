const { MessageEmbed } = require('discord.js');
const collection = require('../../../collectionConfig.json');

module.exports = {
	name: 'website',
	aliases: ['website'],
	description: 'Get the website for the collection',
	usage: 'website',
	category: 'collection',
	args: false,

	execute(message) {
		// Set Variables
		const collectionName = collection.collectionName;
		const collectionBanner = collection.collectionBanner;
		const websiteURL = collection.websiteURL;


		// Create Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Website')
			.setURL(websiteURL)
			.setDescription(
				`Check out the ${collectionName} website! ${websiteURL}`,
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
