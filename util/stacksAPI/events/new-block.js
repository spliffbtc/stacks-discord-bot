const stacks = require('@stacks/blockchain-api-client');

module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('Listening for new blocks...');
	sc.subscribeBlocks(async (block) => {
		client.emit('newBlock', block);
		return block;
	});
};
