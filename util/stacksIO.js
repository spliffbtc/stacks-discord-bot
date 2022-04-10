const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const config = require('../botConfig.json');
const contractID = config.collection.contract.contractAddress;

module.exports = async () => {
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const socket = io(socketUrl, { transports: ['websocket'] });
	console.log('connected to socket');
	const sc = new stacks.StacksApiSocketClient(socket);
	console.log('created stacks client');
	sc.subscribeBlocks();
	console.log('subscribed to new blocks');
	sc.subscribeAddressTransactions(contractID);
	console.log('subscribed to address transactions');
	sc.logEvents();

};