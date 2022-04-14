const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
const config = require('../../botConfig.json');
const channels = config.channels;
let channel = '';
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');

// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;


module.exports = async (client) => {
	const sc = connectWebSocketClient(socketUrl);
	console.log('listening for microblocks...');
	(await sc).subscribeMicroblocks(async (microblock) => {
		client.guilds.cache.forEach(async (guild) => {
			channel = await guild.channels.fetch(channels.stacks.microblock);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Microblock Received')
				.setColor('#0099ff')
				.setURL(`https://explorer.stacks.co/microblock/${microblock.microblock_hash}`)
				.setDescription(
					`Microblock ${microblock.block_height} has been received by the Stacks network containing ${microblock.txs.length} transactions.`,
				)
				.setTimestamp();
			channel.send({ embeds: [embed] });
		});
	});
};
