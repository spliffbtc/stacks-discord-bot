module.exports = async () => {
	console.log('Socket connected to Stacks API');
	require('../events/stacks/new-block.js');
	require('../events/stacks/new-microblock.js');
	require('../events/stacks/new-mint-attempt.js');
	require('../events/stacks/new-market-tx.js');
};
