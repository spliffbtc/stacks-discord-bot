const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for microblocks...');
	(await sc).subscribeMicroblocks(async (microblock) => {
		// Logging
		logger.info('New microblock received!');

		// Set Variables
		const microblockHash = microblock.microblock_hash;
		const microblockHeight = microblock.block_height;
		const txCount = microblock.txs.length;

		// Create Message
		const embed = new MessageEmbed()
			.setTitle('Microblock Received')
			.setColor('#0099ff')
			.setURL(`https://explorer.stacks.co/microblock/${microblockHash}`)
			.setDescription(
				`Microblock ${microblockHeight} has been received by the Stacks network containing ${txCount} transactions.`,
			)
			.setTimestamp();

		// Send Message
		await client.channels.cache
			.get(channels.stacks.microblock)
			.send({ embeds: [embed] });
	});
};
