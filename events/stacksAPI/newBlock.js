const { MessageEmbed } = require('discord.js');
const botConfig = require('../../botConfig.json');

module.exports = {
	name: 'newBlock',
	execute(client, message, block) {
		const embed = new MessageEmbed()
			.setTitle('New Block')
			.setColor('#0099ff')
			.setDescription(`A new block (${block.height}) was just confirmed!`);
		client.channels.cache.get(botConfig.channels.stacks.newblock).send({
			embeds: [embed],
		});
		console.log(`New Block: ${block.height}`);
		console.log('emitted as event');
	},
};
