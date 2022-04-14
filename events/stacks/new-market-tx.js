const { MessageEmbed } = require('discord.js');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');

const config = require('../../botConfig.json');
const channels = config.channels;
let channel = '';

module.exports = async (sc, client) => {
	console.log('listening for market transactions...');
	sc.subscribeMempool(async (mempool) => {
		if (
			mempool.tx_type === 'contract_call' &&
			mempool.contract_call.function_name.includes('market')
		) {
			client.guilds.cache.forEach(async (guild) => {
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
					channel = await guild.channels.fetch(channels.marketplace.listed);
					channel.send({ embeds: [embed] }); break;
				case 'unlist-asset':
					channel = await guild.channels.fetch(channels.marketplace.listed);
					channel.send({ embeds: [embed] }); break;
				case 'list-item':
					channel = await guild.channels.fetch(channels.marketplace.listed);
					channel.send({ embeds: [embed] }); break;
				case 'unlist-item':
					channel = await guild.channels.fetch(channels.marketplace.listed);
					channel.send({ embeds: [embed] }); break;
				case 'buy-item':
					channel = await guild.channels.fetch(channels.marketplace.sold);
					channel.send({ embeds: [embed] }); break;
				case 'purchase-asset':
					channel = await guild.channels.fetch(channels.marketplace.sold);
					channel.send({ embeds: [embed] }); break;
				default:
					break;
				}
				console.log(functionArgs);
			});
		}
		else {
			return;
		}
	},
	);
};