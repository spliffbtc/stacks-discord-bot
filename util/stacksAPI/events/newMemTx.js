const stacks = require('@stacks/blockchain-api-client');
const config = require('../../../botConfig.json');
const collection = config.collection;

const botChannel = config.discord.channels.stacks.mempool;

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