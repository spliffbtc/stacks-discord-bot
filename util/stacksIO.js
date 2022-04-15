const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
module.exports = async (logger, client) => {
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const sc = connectWebSocketClient(socketUrl);
	const newBlock = require('../events/stacks/new-block.js');
	const newMicroblock = require('../events/stacks/new-microblock.js');
	const newMintAttempt = require('../events/stacks/new-mint-attempt.js');
	const newMint = require('../events/stacks/new-mint.js');
	const newMarketTx = require('../events/stacks/new-market-tx.js');
	const newNFTName = require('../events/stacks/new-nft-name.js');
	await newBlock(logger, client, sc);
	await newMicroblock(logger, client, sc);
	await newMintAttempt(logger, client, sc);
	await newMint(logger, client, sc);
	await newMarketTx(logger, client, sc);
	// await newNFTName(logger, client, sc);
	logger.info('Socket connected to Stacks API');
};
