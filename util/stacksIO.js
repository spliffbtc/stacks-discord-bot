module.exports = async (logger, client) => {
	logger.info('Socket connected to Stacks API');
	const newBlock = require('../events/stacks/new-block.js');
	const newMicroblock = require('../events/stacks/new-microblock.js');
	const newMintAttempt = require('../events/stacks/new-mint-attempt.js');
	const newMarketTx = require('../events/stacks/new-market-tx.js');
	await newBlock(logger, client);
	await newMicroblock(logger, client);
	await newMintAttempt(logger, client);
	await newMarketTx(logger, client);
};
