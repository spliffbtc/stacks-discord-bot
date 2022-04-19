const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');
const channels = config.channels;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for microblocks...');
	(await sc).subscribeMicroblocks(async (microblock) => {
		// Logging
		logger.info('New microblock received!');

		// Create Message
		const embed = new MessageEmbed()
			.setTitle('Microblock Received')
			.setColor('#0099ff')
			.setURL(`https://explorer.stacks.co/microblock/${microblock.microblock_hash}`)
			.setDescription(
				`Microblock ${microblock.block_height} has been received by the Stacks network containing ${microblock.txs.length} transactions.`,
			)
			.setTimestamp();

		// Send Message
		await client.channels.cache
			.get(channels.stacks.microblock)
			.send({ embeds: [embed] });
	});
};
