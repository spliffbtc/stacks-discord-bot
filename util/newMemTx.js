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
const botChannel = discordServer.channels.stacks.mempool;
const getCollection = require('../model/collection.js');
const collection = getCollection();

module.exports = async function(client) {
	const sc = await stacks.connectWebSocketClient();
	console.log('listening for new mempool transactions...');
	sc.subscribeMempool(async (tx) => {
		const guild = await client.guilds.fetch(guildID);

		if (guild) {
			const channel = await guild.channels.fetch(botChannel);

			if (
				tx.contract_call &&
				tx.contract_call.contract_id ===
					`${collection.contractID}.${collection.contractName}`
			) {
				channel.send(
					`A new mint attempt has been submitted by ${tx.sender_address}!`,
				);
				return;
			}
			else {
				// console.log('Not a collection tx');
				return;
			}
		}
		return tx;
	});
};
