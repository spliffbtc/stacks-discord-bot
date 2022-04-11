const stacks = require('@stacks/blockchain-api-client');
const collection = require('../../collectionConfig.json');

const botChannel = config.channels.stacks.mempool;

module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new mempool transactions...');
	sc.subscribeMempool(async (tx) => {
		if (
			tx.contract_call &&
				tx.contract_call.contract_id ===
					`${collection.contract.contractAddress}.${collection.contract.contractName}`
		) {
			botChannel.send(
				`A new mint attempt has been submitted by ${tx.sender_address}!`,
			);
			client.emit('newMemTx', tx);
			return tx;
		}
		else {
			return;
		}

	});
};
