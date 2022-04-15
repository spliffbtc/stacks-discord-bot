const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

module.exports = async (logger, client, sc) => {
	logger.info('Listening for microblocks...');
	(await sc).subscribeMicroblocks(async (microblock) => {
		console.log('New microblock received!');
		const embed = new MessageEmbed()
			.setTitle('Microblock Received')
			.setColor('#0099ff')
			.setURL(`https://explorer.stacks.co/microblock/${microblock.microblock_hash}`)
			.setDescription(
				`Microblock ${microblock.block_height} has been received by the Stacks network containing ${microblock.txs.length} transactions.`,
			)
			.setTimestamp();
		await client.channels.cache.get(channels.stacks.microblock).send({ embeds: [embed] });
		// Get Transaction Details
		microblock.txs.forEach(async (tx_id) => {
			const tx = await getTx(tx_id);
		});
	});
};
