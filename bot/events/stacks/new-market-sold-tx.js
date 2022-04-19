const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;
const collection = require('../../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');
const getBNS = require('../../util/stacksAPI/names/get-bns');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for new sales txs...');
	(await sc).subscribeMempool(async (mempool) => {
		// Get Transaction Details
		const tx = mempool;


		// Conditionals
		if (
			tx.tx_type === 'contract_call' &&
			tx.contract_call.contract_id.includes('market') &&
			tx.contract_call.function_name.includes('sold' || 'purchased' || 'purchases' || 'buy' || 'sell' || 'bought') === true &&
			tx.contract_call.function_args[0].repr === contractID
		) {
			// Set Variables
			const txID = tx.tx_id;
			const BNS = await getBNS(tx.sender_address);
			const fee = tx.fee_rate / 10 ** 6;
			const nftID = tx.contract_call.function_args[1].repr.substring(1);
			const price = tx.contract_call.function_args[2].repr.substring(1) / 10 ** 6;
			const imageURL = `${collection.nftImage.prefix}${nftID}.${collection.nftImage.imageType}`;


			// Create Embed
			const embed = new MessageEmbed()
				.setTitle('NFT Sold')
				.setColor('#0099ff')
				.setURL(`https://explorer.stacks.co/txid/${txID}`)
				.addFields(
					{ name: 'Address / BNS', value: BNS },
					{ name: 'NFT ID#', value: nftID },
					{ name: 'Price', value: `${price} STX` },
					{ name: 'Fee', value: `${fee} STX` },
				)
				.setImage(imageURL)
				.setTimestamp();


			// Send Message
			await client.channels.cache
				.get(channels.marketplace.sold)
				.send({ embeds: [embed] });
		}
		else { return; }
	});
};
