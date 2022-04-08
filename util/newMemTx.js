const { io } = require('socket.io-client');
const stacks = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const socket = io(socketUrl, {
	transports: ['websocket'],
});

const { Client, TextChannel, MessageEmbed } = require('discord.js');
const getCollection = require('../model/collection.js');
const collection = getCollection();
const getStacksAPI = require('./stacksAPI.js');
const stacksAPI = getStacksAPI();
const guild_id = process.env.GUILD_ID;
const bot_channel = process.env.BOT_CHANNEL;

// you could pass the discord client here
/**
 *
 * @param {Client} client
 */
module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new mempool transactions...');
	sc.subscribeMempool(async (tx) => {
		const freePunksGuild = guild_id;
		const guild = await client.guilds.fetch(freePunksGuild);

		if (guild) {
			// for now this is the data analytics channel
			const blockChannel = bot_channel;
			/**
			 * @type {TextChannel}
			 */
			const channel = await guild.channels.fetch(blockChannel);
			if (
				tx.contract_call &&
				tx.contract_call.contract_id ===
					'SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0'
			) {
				// channel.send(
				// 	`A new mint attempt has been submitted by ${tx.sender_address}!`
				// );
				return;
			}
			else {
				// console.log("Not a free-punks tx");
				return;
			}
		}
		return tx;
		// do things with the client
	});
};
