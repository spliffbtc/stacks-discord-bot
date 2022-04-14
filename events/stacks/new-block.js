const { MessageEmbed } = require('discord.js');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const config = require('../../botConfig.json');
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');


// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
const marketplaceContract = 'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.marketplace-v4';
const channels = config.channels;
let channel = '';

module.exports = async (client, block) => {
	console.log('working');
	// Subscribe: New Blocks
	client.guilds.cache.forEach(async (guild) => {
		channel = await guild.channels.fetch(channels.stacks.newblock);
		if (!channel) return;
		const embed = new MessageEmbed()
			.setTitle('Block Received')
			.setURL(`https://explorer.stacks.co/block/${block.hash}`)
			.setDescription(
				`Block ${block.height} has been received by the Stacks network containing ${block.txs.length} transactions.`,
			)
			.setColor('#0099ff')
			.setTimestamp();
		channel.send({ embeds: [embed] });
	});

};
