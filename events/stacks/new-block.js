const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const collection = require('../../collectionConfig.json');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		console.log('New block received!');
		console.log(block);
		const embed = new MessageEmbed()
			.setTitle('Block Received')
			.setURL(`https://explorer.stacks.co/block/${block.hash}`)
			.setDescription(
				`Block ${block.height} has been received by the Stacks network containing ${block.txs.length} transactions.`,
			)
			.setColor('#0099ff')
			.setTimestamp();
		await client.channels.cache.get(channels.stacks.newblock).send({ embeds: [embed] });

		block.txs.forEach(async (tx_id) => {
			// Get Transaction Details
			const tx = await getTx(tx_id);
			// Collection Contract
			if (tx.data.tx_type === 'contract_call' && tx.data.contract_call.contract_id === contractID && tx.data.tx_status === 'success') {
				console.log(tx.data);
				// MessageEmbed: New Mint Transaction
				const mintEmbed = new MessageEmbed()
					.setTitle('New Mint!')
					.setColor('#0099ff')
					.setURL(`https://explorer.stacks.co/transaction/${tx.data.tx_id}`)
					.setDescription(
						`Successful mint of ${tx.data.tx_id} by ${tx.data.sender_address}`,
					)
					.setTimestamp();
				// Send Embed
				await client.channels.cache.get(channels.stacks.minted).send({ embeds: [mintEmbed] });
			}
			else {return;}
		});
	});
};