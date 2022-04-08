const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const socket = io(socketUrl, {
	transports: ['websocket'],
});
let stacksAPI = require('./stacksAPI.js');
stacksAPI = stacksAPI();
let collection = require('../model/collection.js');
const { Client, TextChannel, MessageEmbed } = require('discord.js');
collection = collection();
// Hmm
// you could pass the discord client here
/**
 *
 * @param {Client} client
 */
module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new microblocks...');
	sc.subscribeMicroblocks(async (microblock) => {
		const freePunksGuild = '947501281734451210';
		const guild = await client.guilds.fetch(freePunksGuild);

		if (guild) {
			// for now this is the data analytics channel
			const blockChannel = '954316109018955777';
			/**
			 * @type {TextChannel}
			 */
			const channel = await guild.channels.fetch(blockChannel);
			// channel.send(`A new microblock has appeared!`);
		}
		return microblock;
		// do things with the client
	});
};
