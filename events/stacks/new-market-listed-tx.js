const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const collection = require('../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for new listing txs...');
	(await sc).subscribeBlocks(async (block) => {
		block.txs.forEach(async (tx_id) => {
			// Get Transaction Details
			const tx = await getTx(tx_id);
			// Collection Contract
			if (tx.data.tx_type === 'contract_call' && tx.data.tx_status === 'success') {
				if (tx.data.contract_call.contract_id.includes('market') === true) {
					if (tx.data.contract_call.function_name.includes('list' || 'listed') === true) {
						if (tx.data.contract_call.function_args[0].repr === contractID) {
							const txID = tx.data.tx_id;
							const BNS = await getBNS(tx.data.sender_address);
							const resultRepr = tx.data.tx_result.repr;
							const nftID = resultRepr.replace('(ok u', '').replace(')', '');
							const fee = tx.data.fee_rate / (10 ** 6);

							// MessageEmbed: New Market Tx Transaction
							const embed = new MessageEmbed()
								.setTitle('NFT Listed / Unlisted')
								.setColor('#0099ff')
								.setURL(`https://explorer.stacks.co/txid/${txID}`)
								.setDescription(`${BNS} \nis attempting to list a new NFT.`)
								.addFields(
									{ name: 'Address', value: `${BNS}` },
									{ name: 'nftID', value: `${nftID}` },
									{ name: 'Fee', value: `${fee} STX` },
								)
								.setTimestamp();
							// Send Embed
							await client.channels.cache.get(channels.marketplace.listed).send({ embeds: [embed] });
							console.log(embed);
						}
						else {return;}
					}
					else {return;}
				}
				else {return;}
			}
			else {return;}
		});
	});
};