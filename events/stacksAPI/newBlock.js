const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'newBlock',
	execute(message, block) {
		message.channel.send(`A new block (${block.height}) was just confirmed!`);
		console.log(`New Block: ${block.height}`);
	},
};
