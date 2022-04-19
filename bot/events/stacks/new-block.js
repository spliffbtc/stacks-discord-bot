const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		// Set Variables
		const blockHeight = block.height;
		const blockHash = block.hash;
		const txCount = block.txs.length;

		// Logging
		logger.info('New block received!');

		// Create Embed
		const embed = new MessageEmbed()
			.setTitle('Block Received')
			.setURL(`https://explorer.stacks.co/block/${blockHeight}`)
			.setDescription(
				`Block ${blockHash} has been received by the Stacks network containing ${txCount} transactions.`,
			)
			.setColor('#0099ff')
			.setTimestamp();

		// Send Message
		await client.channels.cache
			.get(channels.stacks.newblock)
			.send({ embeds: [embed] });
	});
};