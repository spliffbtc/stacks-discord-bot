const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const channels = config.channels;

module.exports = async (logger, client, sc) => {
	logger.info('Listening for blocks...');
	(await sc).subscribeBlocks(async (block) => {
		logger.info('New block received!');
		const embed = new MessageEmbed()
			.setTitle('Block Received')
			.setURL(`https://explorer.stacks.co/block/${block.hash}`)
			.setDescription(
				`Block ${block.height} has been received by the Stacks network containing ${block.txs.length} transactions.`,
			)
			.setColor('#0099ff')
			.setTimestamp();
		await client.channels.cache.get(channels.stacks.newblock).send({ embeds: [embed] });
	});
};