const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const socket = io(socketUrl, {
	transports: ['websocket'],
});
let stacksAPI = require('./stacksAPI.js');
stacksAPI = stacksAPI();
const getCollection = require('../model/collection.js');
const { Client, TextChannel } = require('discord.js');
const collection = getCollection();
const guild_id = process.env.guild_id;

const bot_channel = process.env.bot_channel;

// you could pass the discord client here
/**
 *
 * @param {Client} client
 */
module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new blocks...');
	sc.subscribeBlocks(async (block) => {
		const freePunksGuild = guild_id;
		const guild = await client.guilds.fetch(freePunksGuild);

		if (guild) {
			// for now this is the data analytics channel
			const blockChannel = bot_channel;
			/**
			 * @type {TextChannel}
			 */
			const channel = await guild.channels.fetch(blockChannel);
			// channel.send(`A new block (${block.height}) was just confirmed!`);
		}
		return block;
		// do things with the client
	});
};
