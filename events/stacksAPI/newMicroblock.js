module.exports = {
	name: 'newMicroblock',
	execute(client, microblock) {
		console.log(`New Microblock: ${microblock.height}`);
	},
};
