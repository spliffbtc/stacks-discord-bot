const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'newMemTx',
	execute(message, tx) {
		message.channel.send(`A new block (${tx.tx_id}) was just confirmed!`);
		console.log(`New Block: ${tx.tx_id}`);
	},
};
