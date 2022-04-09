module.exports = {
	name: 'newBlock',
	execute(client, block) {
		console.log(`New Block: ${block.height}`);
	},
};
