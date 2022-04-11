const stacks = require('@stacks/blockchain-api-client');

const config = require('../../../botConfig.json');
const guildID = config.guildID;
const botChannel = config.channels.stacks.microblock;

module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new microblocks...');
	sc.subscribeMicroblocks(async (microblock) => {
		const guild = await client.guilds.fetch(guildID);

		if (guild) {
			const channel = await guild.channels.fetch(botChannel);
			channel.send('A new microblock has appeared!');
		}
		return microblock;
	});
};
