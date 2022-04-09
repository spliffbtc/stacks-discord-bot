module.exports = {
	name: 'newMemTx',
	execute(client, tx) {
		console.log(`New MemTx: ${tx.tx_id}`);
	},
};
