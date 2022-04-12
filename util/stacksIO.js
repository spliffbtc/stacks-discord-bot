const { MessageEmbed, Client } = require('discord.js');
const collection = require('../collectionConfig.json');
const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
// const collection = require('../collectionConfig.json');


module.exports = async (client) => {

	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const socket = io(socketUrl, { transports: ['websocket'] });
	const sc = new stacks.StacksApiSocketClient(socket);
	console.log('Socket connected to Stacks API');

	// Build Contract ID
	const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

	// Subscriptions
	sc.subscribeBlocks();
	sc.subscribeMicroblocks();
	sc.subscribeMempool();

	// Handle Subscriptions
	sc.handleSubscription(async (message) => {
		console.log(message);
		return message;
	});
};