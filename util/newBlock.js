const stacks = require('@stacks/blockchain-api-client');
const config = require('../config.json');
const guildID = config.guildID;
const botChannel = config.channels.stacks.microblock;

module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new blocks...');
	sc.subscribeBlocks(async (block) => {
		const guild = await client.guilds.fetch(guildID);

		if (guild) {
			const channel = await guild.channels.fetch(botChannel);
			channel.send(`A new block (${block.height}) was just confirmed!`);
		}
		return block;
	});
};
