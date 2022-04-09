const stacks = require('@stacks/blockchain-api-client');
const config = require('../botConfig.json');
const collection = config.collection;
const guildID = config.guildID;
const botChannel = config.channels.stacks.mempool;

module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new mempool transactions...');
	sc.subscribeMempool(async (tx) => {
		const guild = await client.guilds.fetch(guildID);

		if (guild) {
			const channel = await guild.channels.fetch(botChannel);

			if (
				tx.contract_call &&
				tx.contract_call.contract_id ===
					`${collection.contractID}.${collection.contractName}`
			) {
				channel.send(
					`A new mint attempt has been submitted by ${tx.sender_address}!`,
				);
				return;
			}
			else {
				return;
			}
		}
		return tx;
	});
};
