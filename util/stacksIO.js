const { MessageEmbed } = require('discord.js');
const collection = require('../collectionConfig.json');
const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const config = require('../botConfig.json');
// const collection = require('../collectionConfig.json');

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const socket = io(socketUrl, { transports: ['websocket'] });
	const sc = new stacks.StacksApiSocketClient(socket);
	console.log('Socket connected to Stacks API');

	// Build Contract ID
	const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const channels = config.channels.stacks;

	// Subscriptions
	// New Blocks
	console.log('listening for blocks...');
	sc.subscribeBlocks((block) => {
		client.guilds.cache.forEach((guild) => {
			const channel = guild.channels.cache.find(
				(c) => c.id === channels.newblock,
			);
			if (!channel) return;
			console.log(`New block: ${block.height}`);
			const embed = new MessageEmbed()
				.setTitle('Block Received')
				.setDescription(
					`Block ${block.height} has been received by the Stacks network.`,
				)
				.setColor('#0099ff')
				.setTimestamp();
			channel.send({ embeds: embed });
		});
	});
	// New Microblocks
	console.log('listening for microblocks...');
	sc.subscribeMicroblocks((microblock) => {
		client.guilds.cache.forEach((guild) => {
			const channel = guild.channels.cache.find(
				(c) => c.id === channels.microblock,
			);
			if (!channel) return;
			console.log(`New microblock: ${microblock.block_height}`);
			const embed = new MessageEmbed()
				.setTitle('Microblock Received')
				.setDescription(
					`Microblock ${microblock.block_height} has been received by the Stacks network.`,
				)
				.setColor('#0099ff')
				.setTimestamp();
			channel.send({ embeds: embed });
		});
	});
	// New Mempool Transactions (just logging for now to test event handler)
	console.log('listening for transactions...');
	sc.subscribeMempool((mempool) => {
		console.log(`New transaction: ${mempool.tx_id}`);
		return;
	});
};
