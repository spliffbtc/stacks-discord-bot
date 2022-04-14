const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const config = require('../../botConfig.json');
const channels = config.channels;
const channel = '';
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;


module.exports = async (client) => {
	const sc = connectWebSocketClient(socketUrl);
	console.log('Listening for microblocks...');
	(await sc).subscribeMicroblocks(async (microblock) => {
		console.log('New microblock received!');
		if (!channel) return;
		const embed = new MessageEmbed()
			.setTitle('Microblock Received')
			.setColor('#0099ff')
			.setURL(`https://explorer.stacks.co/microblock/${microblock.microblock_hash}`)
			.setDescription(
				`Microblock ${microblock.block_height} has been received by the Stacks network containing ${microblock.txs.length} transactions.`,
			)
			.setTimestamp();
		await client.channels.cache.get(channels.stacks.microblock).send({ embeds: [embed] });
	});
};
