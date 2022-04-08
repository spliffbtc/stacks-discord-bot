const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const socket = io(socketUrl, {
	transports: ['websocket'],
});

const { Client, TextChannel, MessageEmbed } = require('discord.js');
const getDiscordServer = require('../model/discordServer.js');
const discordServer = getDiscordServer();
const guildID = discordServer.guildID;
const botChannel = discordServer.channels.stacks.microblock;

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
