const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const config = require('../botConfig.json');
const contractID = config.collection.contract.contractAddress + config.collection.contract.contractName;

module.exports = async (client) => {
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const socket = io(socketUrl, { transports: ['websocket'] });
	const sc = new stacks.StacksApiSocketClient(socket);
	console.log('Socket connected to Stacks API');
	// Subscriptions
	sc.subscribeBlocks();
	// Handle Subscription Events
	sc.handleSubscription(async (block) => {
		console.log(block);
		client.emit('newBlock', block);
	});
};
