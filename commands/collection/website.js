const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = {
	name: 'website',
	aliases: ['website'],
	description: 'Get the website for the collection',
	usage: 'website',
	category: 'collection',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	guildOnly: false,
	args: false,
	cooldown: 5,
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
