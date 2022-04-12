const { MessageEmbed } = require('discord.js');
const botConfig = require('../../botConfig.json');

module.exports = {
	name: 'newMicroblock',
	execute(client, message, microblock) {
		const embed = new MessageEmbed()
			.setTitle('New Microblock')
			.setColor('#0099ff')
			.setDescription(
				`A new microblock (${microblock.height}) was just confirmed!`,
			);
		client.channels.cache.get(botConfig.channels.stacks.microblock).send({
			embeds: [embed],
		});
		console.log(`New Microblock: ${microblock.height}`);
	},
};
