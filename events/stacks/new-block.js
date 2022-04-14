const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const sc = connectWebSocketClient(socketUrl);
const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
let channel = '';
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

module.exports = async (client) => {
	console.log('listening for blocks...');
	sc.subscribeBlocks(async (block) => {
		client.guilds.cache.forEach(async (guild) => {
			channel = await guild.channels.fetch(channels.stacks.newblock);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Block Received')
				.setURL(`https://explorer.stacks.co/block/${block.hash}`)
				.setDescription(
					`Block ${block.height} has been received by the Stacks network containing ${block.txs.length} transactions.`,
				)
				.setColor('#0099ff')
				.setTimestamp();
			channel.send({ embeds: [embed] });
		});
		block.forEach(async (tx) => {
			const fetchedTx = await getTx(tx);
			console.log(fetchedTx);
		});
	});
};
