const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const config = require('../../botConfig.json');
const channels = config.channels;
const channel = '';
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;


module.exports = async (logger, client) => {
	const sc = connectWebSocketClient(socketUrl);
	logger.info('Listening for market transactions...');
	(await sc).subscribeMempool(async (mempool) => {
		if (
			mempool.tx_type === 'contract_call' &&
			mempool.contract_call.function_name.includes('market')
		) {
			logger.info('New market transaction detected!');
			const tx_id = mempool.tx_id;
			const contract = mempool.contract_call.contract_id;
			const address = mempool.sender_address;
			const functionName = mempool.contract_call.function_name;
			const functionArgs = mempool.contract_call.function_args;
			const fee = mempool.fee_rate / (10 ** 6);
			const nonce = mempool.nonce;
			const BNS = await getBNS(address);

			const embed = new MessageEmbed()
				.setTitle('Mempool: Marketplace Transaction')
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

			switch (functionName) {
			case 'list-asset':
				client.channels.cache.get(channels.marketplace.listed).send({ embeds: [embed] }); break;
			case 'unlist-asset':
				client.channels.cache.get(channels.marketplace.listed).send({ embeds: [embed] }); break;
			case 'list-item':
				client.channels.cache.get(channels.marketplace.listed).send({ embeds: [embed] }); break;
			case 'unlist-item':
				client.channels.cache.get(channels.marketplace.listed).send({ embeds: [embed] }); break;
			case 'buy-item':
				client.channels.cache.get(channels.marketplace.sold).send({ embeds: [embed] }); break;
			case 'purchase-asset':
				client.channels.cache.get(channels.marketplace.sold).send({ embeds: [embed] }); break;
			default:
				break;
			}

		}
		else {
			return;
		}
	},
	);
};