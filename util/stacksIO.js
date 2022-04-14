module.exports = async (client) => {
	console.log('Socket connected to Stacks API');
	const newBlock = require('../events/stacks/new-block.js');
	const newMicroblock = require('../events/stacks/new-microblock.js');
	const newMintAttempt = require('../events/stacks/new-mint-attempt.js');
	const newMarketTx = require('../events/stacks/new-market-tx.js');
	await newBlock(client);
	await newMicroblock(client);
	await newMintAttempt(client);
	await newMarketTx(client);
};
