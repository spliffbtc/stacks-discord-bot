const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const collection = require('../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = 'SP158WX3ZNRDG4SR56TD1398NZK1945QTTKB8B60X.snns';

module.exports = async (logger, client, sc) => {
	logger.info('Listening for new naming transactions...');
	(await sc).subscribeBlocks(async (block) => {
		block.txs.forEach(async (tx_id) => {
			// Get Transaction Details
			const tx = await getTx(tx_id);
			// Collection Contract
			if (tx.data.tx_type === 'contract_call' && tx.data.contract_call.contract_id === contractID && tx.data.tx_status === 'success') {
				console.log(tx.data);
				const tx_id = tx.data.tx_id;
				const BNS = getBNS(tx.data.sender_address);
				const functionName = tx.data.contract_call.functionName;
				const contract = tx.data.contract_call.contract_id;
				const contractCall = tx.data.contract_call;
				const namedCollection = contractCall.args[0];
				const namedNFT = contractCall.args[1];
				const nftName = contractCall.args[2];
				const fee = tx.data.fee_rate / (10 ** 6);
				const nonce = tx.data.nonce;
				console.log(`${BNS} is renaming from ${namedCollection} for # ${namedNFT} with name ${nftName}`);
				console.log(contractCall);

				// MessageEmbed: New NFT Name Transaction
				const embed = new MessageEmbed()
					.setTitle('New Mint!')
					.setColor('#0099ff')
					.setURL(`https://explorer.stacks.co/transaction/${tx.data.tx_id}`)
					.setDescription(
						`${BNS} is renaming from ${namedCollection} for #${namedNFT} with name ${nftName}`,
					)
					.setTimestamp();
				// Send Embed
				// await client.channels.cache.get(channels.stacks.minted).send({ embeds: [embed] });
				// console.log(embed);
			}
			else {return;}
		});
	});
};