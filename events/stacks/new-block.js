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

module.exports = async (logger, client) => {
	const sc = connectWebSocketClient(socketUrl);
	logger.info('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		logger.info('New block received!');
		if (!channel) return;
		const embed = new MessageEmbed()
			.setTitle('Block Received')
			.setURL(`https://explorer.stacks.co/block/${block.hash}`)
			.setDescription(
				`Block ${block.height} has been received by the Stacks network containing ${block.txs.length} transactions.`,
			)
			.setColor('#0099ff')
			.setTimestamp();
		client.channels.cache.get(channels.stacks.newblock).send({ embeds: [embed] });
	});
	// Get Transaction Details
	// Filter for Collection
	// MessageEmbed

};
