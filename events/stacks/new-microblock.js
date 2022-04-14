const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = require('../../collectionConfig.json');
const getBNS = require('../../util/stacksAPI/names/get-bns.js');
const getTx = require('../../util/stacksAPI/transactions/get-transaction.js');


// Build Contract ID
const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
const marketplaceContract = 'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.marketplace-v4';
const channels = config.channels;
let channel = '';

module.exports = async (client, microblock) => {
	console.log('working');
	// Subscribe New Microblocks
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

};
