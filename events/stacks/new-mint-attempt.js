const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const config = require('../../botConfig.json');
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');


// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
const marketplaceContract = 'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.marketplace-v4';
const channels = config.channels;
let channel = '';

module.exports = async (client, mempool) => {
	console.log('working');
	if (mempool.tx_type === 'contract_call') {
		// Collection Contract Call
		if (mempool.tx_type === 'contract_call' && mempool.contract_call.contract_id === contractID) {
			client.guilds.cache.forEach(async (guild) => {
				channel = await guild.channels.fetch(channels.stacks.mempool);
				if (!channel) return;
				const tx_id = mempool.tx_id;
				const contract = mempool.contract_call.contract_id;
				const address = mempool.sender_address;
				const functionName = mempool.contract_call.function_name;
				const fee = mempool.fee_rate / (10 ** 6);
				const nonce = mempool.nonce;
				const BNS = await getBNS(address);
				const embed = new MessageEmbed()
					.setTitle('Mempool: Collection Transaction')
					.setColor('#0099ff')
					.setURL(`https://explorer.stacks.co/txid/${tx_id}`)
					.setFields(
						{ name: 'Transaction ID', value: tx_id.toString() },
						{ name: 'Contract', value: contract.toString() },
						{ name: 'Sender', value: BNS.toString() },
						{ name: 'Function', value: functionName.toString() },
						{ name: 'Fee', value: fee.toString() },
						{ name: 'Nonce', value: nonce.toString() },
					)
					.setTimestamp();
				channel.send({ embeds: [embed] });
			});
		}
	}
};