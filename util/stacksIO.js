const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const collection = require('../collectionConfig.json');


module.exports = async (client) => {
	const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
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
