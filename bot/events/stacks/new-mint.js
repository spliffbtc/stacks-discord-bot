const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;
const collection = require('../../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		block.txs.forEach(async (tx_id) => {
			// Get Transaction Details
			const resp = await getTx(tx_id);
			const tx = resp.data;
			// Collection Contract
			if (tx.tx_type === 'contract_call' && tx.tx_status === 'success') {
				if (tx.contract_call.contract_id === contractID && tx.contract_call.function_name === 'mint') {
					const txID = tx.tx_id;
					const BNS = await getBNS(tx.sender_address);
					const resultRepr = tx.tx_result.repr;
					const nftID = resultRepr.replace('(ok u', '').replace(')', '');
					const fee = tx.fee_rate / (10 ** 6);

					// MessageEmbed: New Mint Transaction
					const embed = new MessageEmbed()
						.setTitle('New Mint Received')
						.setColor('#0099ff')
						.setURL(`https://explorer.stacks.co/txid/${txID}`)
						.setImage(
							`${collection.nftImage.prefix}${nftID}.${collection.nftImage.imageType}`,
						)
						.setDescription(`${BNS} \nminted ${collection.collectionPrefix} ${nftID} \nwith a fee of ${fee} STX.`,
						)
						.setTimestamp();
					// Send Embed
					await client.channels.cache.get(channels.stacks.minted).send({ embeds: [embed] });
				}
				else {return;}
			}
			else {return;}
		});
	});
};