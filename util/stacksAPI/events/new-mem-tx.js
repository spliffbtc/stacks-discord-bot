const stacks = require('@stacks/blockchain-api-client');
const botConfig = require('../../../botConfig.json');
const botChannel = botConfig.channels.stacks.mempool;
const collectionConfig = require('../../../collectionConfig.json');
const contract = collectionConfig.contract;

module.exports = async function(logger, client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('Listening for new mempool transactions...');
	sc.subscribeMempool(async (tx) => {
		if (
			tx.contract_call &&
				tx.contract_call.contract_id ===
					`${contract.contractAddress}.${contract.contractName}`
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
