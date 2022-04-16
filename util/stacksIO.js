const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const newBlock = require('../events/stacks/new-block.js');
const newMicroblock = require('../events/stacks/new-microblock.js');
const newMintAttempt = require('../events/stacks/new-mint-attempt.js');
const newMint = require('../events/stacks/new-mint.js');
const newMarketListedTx = require('../events/stacks/new-market-listed-tx.js');
const newMarketSoldTx = require('../events/stacks/new-market-sold-tx.js');
// const newNFTName = require('../events/stacks/new-nft-name.js');

module.exports = async (logger, client) => {
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const sc = connectWebSocketClient(socketUrl);

	await newBlock(logger, client, sc);
	await newMicroblock(logger, client, sc);
	await newMintAttempt(logger, client, sc);
	await newMint(logger, client, sc);
	await newMarketListedTx(logger, client, sc);
	await newMarketSoldTx(logger, client, sc);
	// await newNFTName(logger, client, sc);
	logger.info('Socket connected to Stacks API');
};
