const { MessageEmbed, Client } = require('discord.js');
const botConfig = require('../botConfig.json');
const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
// const collection = require('../collectionConfig.json');


module.exports = async (client) => {
	// const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const socket = io(socketUrl, { transports: ['websocket'] });
	const sc = new stacks.StacksApiSocketClient(socket);
	console.log('Socket connected to Stacks API');

	// Subscriptions
	sc.subscribeBlocks();
	sc.subscribeMicroblocks();
	// ! Removed until I have a handle on this
	// sc.subscribeMempool();

	// Handle Subscriptions
	sc.handleSubscription();
	sc.logEvents();

};