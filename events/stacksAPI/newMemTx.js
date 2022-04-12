const { MessageEmbed } = require('discord.js');
const botConfig = require('../../botConfig.json');

module.exports = {
	name: 'newMemTx',
	execute(client, message, tx) {
		const embed = new MessageEmbed()
			.setTitle('New Mempool Transaction')
			.setColor('#0099ff')
			.setDescription(`A new transaction (${tx.txid}) was just submitted to the mempool!`);
		client.channels.cache.get(botConfig.channels.stacks.mempool).send({
			embeds: [embed],
		});
		console.log(`New Mempool Transaction: ${tx.txid}`);
	},
};