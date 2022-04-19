const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;
const collection = require('../../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;


module.exports = async (logger, client, sc) => {
	logger.info('Listening for new mint attempts...');
	(await sc).subscribeMempool(async (mempool) => {
		// Get Transaction Details
		const tx = mempool;


		// Conditionals
		if (
			tx.tx_type === 'contract_call' &&
			tx.contract_call.contract_id === contractID
		) {
			// Logging
			logger.info('New mint attempt detected!');


			// Set Variables
			const tx_id = tx.tx_id;
			const address = tx.sender_address;
			const fee = tx.fee_rate / (10 ** 6);
			const BNS = await getBNS(address);


			// Create Embed
			const embed = new MessageEmbed()
				.setTitle('Mint Attempt Received')
				.setColor('#0099ff')
				.setURL(`https://explorer.stacks.co/txid/${tx_id}`)
				.setDescription(`${BNS} \nhas sent a mint attempt \nwith a fee of ${fee} STX.`)
				.setTimestamp();


			// Send Message
			await client.channels.cache
				.get(channels.stacks.mempool)
				.send({ embeds: [embed] });
		}
	});
};