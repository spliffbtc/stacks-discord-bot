const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');


const socketUrl = 'https://://stacks-node-api.mainnet.stacks.co/';
const socket = io(socketUrl, { transports: ['websocket'] });
console.log('connected to socket');
const sc = new stacks.StacksApiSocketClient(socket);
console.log('created stacks client');
sc.subscribeAddressTransactions('SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.staking-helper');
console.log('subscribed to address transactions');
