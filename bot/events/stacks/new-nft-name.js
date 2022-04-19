const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;
const collection = require('../../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = 'SP158WX3ZNRDG4SR56TD1398NZK1945QTTKB8B60X.snns';

module.exports = async (logger, client, sc) => {
	logger.info('Listening for new naming transactions...');
	(await sc).subscribeBlocks(async (block) => {
		block.txs.forEach(async (tx_id) => {
			// Get Transaction Details
			const resp = await getTx(tx_id);
			const tx = resp.data;


			// Conditionals
			if (tx.tx_type === 'contract_call' && tx.contract_call.contract_id === contractID && tx.tx_status === 'success') {


				// Set Variables
				const txID = tx.tx_id;
				const BNS = getBNS(tx.sender_address);
				const functionName = tx.contract_call.functionName;
				const contract = tx.contract_call.contract_id;
				const contractCall = tx.contract_call;
				const namedCollection = contractCall.args[0];
				const namedNFT = contractCall.args[1];
				const nftName = contractCall.args[2];
				const fee = tx.fee_rate / (10 ** 6);
				const nonce = tx.nonce;

				// Create Embed
				const embed = new MessageEmbed()
					.setTitle('New Mint!')
					.setColor('#0099ff')
					.setURL(`https://explorer.stacks.co/txid/${txID}`)
					.setDescription(
						`${BNS} is renaming from ${namedCollection} for #${namedNFT} with name ${nftName}`,
					)
					.setTimestamp();


				// Send Message
				// await client.channels.cache.get(channels.stacks.minted).send({ embeds: [embed] });
			}
			else {return;}
		});
	});
};