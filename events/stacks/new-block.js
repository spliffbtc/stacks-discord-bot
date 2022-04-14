const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const config = require('../../botConfig.json');
const channels = config.channels;
let channel = '';
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (client) => {
	const sc = connectWebSocketClient(socketUrl);
	console.log('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		console.log('New block received!');
		client.guilds.cache.forEach(async (guild) => {
			channel = await guild.channels.fetch(channels.stacks.newBlock);
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
		// Get Transaction Details
		// Filter for Collection
		// MessageEmbed
	});
};
