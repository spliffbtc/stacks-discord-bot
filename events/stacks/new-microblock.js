const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const sc = connectWebSocketClient(socketUrl);
const config = require('../../botConfig.json');
const channels = config.channels;
let channel = '';

module.exports = async (client) => {
	console.log('listening for microblocks...');
	sc.subscribeMicroblocks(async (microblock) => {
		client.guilds.cache.forEach(async (guild) => {
			channel = await guild.channels.fetch(channels.stacks.microblock);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Microblock Received')
				.setColor('#0099ff')
				.setURL(`https://explorer.stacks.co/microblock/${microblock.microblock_hash}`)
				.setDescription(
					`Microblock ${microblock.block_height} has been received by the Stacks network containing ${microblock.txs.length} transactions.`,
				)
				.setTimestamp();
			channel.send({ embeds: [embed] });
		});
	});
};
