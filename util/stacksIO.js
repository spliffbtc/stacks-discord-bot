const { MessageEmbed, Client } = require('discord.js');
const collection = require('../collectionConfig.json');
const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
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

	// Subscriptions
	sc.subscribeBlocks((block) => {
		client.guilds.cache.forEach((guild) => {
			const channel = guild.channels.cache.find(
				(c) => c.id === '961870023444553778',
			);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Block Received')
				.setDescription(
					`Block ${block.height} has been received by the Stacks network.`,
				)
				.setColor('#0099ff')
				.setTimestamp();
			channel.send(embed);
		});
	});
	sc.subscribeMicroblocks();
	sc.subscribeMempool();

	// Handle Subscriptions
	// const sub = sc.handleSubscription("block", true);
};
