const stacks = require('@stacks/blockchain-api-client');

module.exports = async function(logger, client) {
	const sc = await stacks.connectWebSocketClient();
	logger.info('Listening for new blocks...');
	sc.subscribeBlocks(async (block) => {
		client.emit('newBlock', block);
		return block;
	});
};
