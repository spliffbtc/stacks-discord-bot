const { MessageEmbed } = require('discord.js');
const collection = require('../collectionConfig.json');
const config = require('../botConfig.json');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const getBNS = require('../util/stacksAPI/names/get-bns.js');
const getTx = require('../util/stacksAPI/transactions/get-transaction.js');


module.exports = async (client) => {
	const socketUrl = 'https://stacks-node-api.mainnet.stacks.co/';
	const sc = await connectWebSocketClient(socketUrl);
	console.log('Socket connected to Stacks API');

	// Build Contract ID
	const contractID = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const channels = config.channels.stacks;

	// Subscribe: New Blocks
	console.log('listening for blocks...');
	sc.subscribeBlocks(async (block) => {
		block.txs.forEach(async tx => {
			console.log(block.tx_details);
			const tx_details = await getTx(tx);
			console.log(tx_details);
		});
		client.guilds.cache.forEach(async (guild) => {
			const channel = await guild.channels.fetch(channels.newblock);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Block Received')
				.setDescription(
					`Block ${block.height} has been received by the Stacks network containing ${block.tx_details.length} transactions.`,
				)
				.setColor('#0099ff')
				.setTimestamp();
			channel.send({ embeds: [embed] });
		});
	});

	// SubscribeL New Microblocks
	console.log('listening for microblocks...');
	sc.subscribeMicroblocks(async (microblock) => {
		client.guilds.cache.forEach(async (guild) => {
			const channel = await guild.channels.fetch(channels.microblock);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Microblock Received')
				.setDescription(
					`Microblock ${microblock.block_height} has been received by the Stacks network.`,
				)
				.setColor('#0099ff')
				.setTimestamp();
			channel.send({ embeds: [embed] });
		});
	});

	// Subscribe: Mempool Transactions
	console.log('listening for transactions...');
	sc.subscribeMempool(async (mempool) => {
		if (mempool.tx_type === 'contract_Call' && mempool.contract_call.contract_id === contractID) {
			client.guilds.cache.forEach(async (guild) => {
				const channel = await guild.channels.fetch(channels.mempool);
				if (!channel) return;
				const tx_id = mempool.tx_id;
				const address = mempool.sender_address;
				const functionName = mempool.contract_call.function_name;
				const fee = mempool.fee_rate * 10 ^ 6;
				const BNS = await getBNS(address);
				console.log(`New transaction: ${mempool.tx_id}`);
				const embed = new MessageEmbed()
					.setTitle('New Transaction')
					.setColor('#0099ff')
					.setFields(
						{ name: 'Transaction ID', value: tx_id },
						{ name: 'Sender', value: BNS },
						{ name: 'Function', value: functionName },
						{ name: 'Fee', value: fee },
					)
					.setTimestamp();
				channel.send({ embeds: [embed] });
			});
		}
		else {return;}
	});
};
