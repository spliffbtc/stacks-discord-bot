const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;


module.exports = async (logger, client, sc) => {
	logger.info('Listening for new mint attempts...');
	(await sc).subscribeMempool(async (mempool) => {
		if (mempool.tx_type === 'contract_call' && mempool.contract_call.contract_id === contractID) {
			logger.info('New mint attempt detected!');
			const tx_id = mempool.tx_id;
			const contract = mempool.contract_call.contract_id;
			const address = mempool.sender_address;
			const functionName = mempool.contract_call.function_name;
			const fee = mempool.fee_rate / (10 ** 6);
			const nonce = mempool.nonce;
			const BNS = await getBNS(address);
			const embed = new MessageEmbed()
				.setTitle('Mint Attempt Received')
				.setColor('#0099ff')
				.setURL(`https://explorer.stacks.co/txid/${tx_id}`)
				.setDescription(`${BNS} attempted a mint with a fee of ${fee} STX.`)
				.setTimestamp();
			await client.channels.cache.get(channels.stacks.mempool).send({ embeds: [embed] });
		}
	});
};