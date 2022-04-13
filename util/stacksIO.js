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
			const tx_details = await getTx(tx);
			if (!tx_details.tx_type) {return;}
			else {console.log(tx_details.tx_type);}
		});
		client.guilds.cache.forEach(async (guild) => {
			const channel = await guild.channels.fetch(channels.newblock);
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
	});

	// SubscribeL New Microblocks
	console.log('listening for microblocks...');
	sc.subscribeMicroblocks(async (microblock) => {
		client.guilds.cache.forEach(async (guild) => {
			const channel = await guild.channels.fetch(channels.microblock);
			if (!channel) return;
			const embed = new MessageEmbed()
				.setTitle('Microblock Received')
				.setColor('#0099ff')
				.setURL(`https://explorer.stacks.co/microblock/${microblock.microblock_hash}`)
				.setDescription(
					`Microblock ${microblock.block_height} has been received by the Stacks network containing ${microblock.txs.length} transactions.`,
				);
			channel.send({ embeds: [embed] });
		});
	});

	// Subscribe: Mempool Transactions
	console.log('listening for transactions...');
	sc.subscribeMempool(async (mempool) => {
		if (mempool.tx_type === 'contract_call' && mempool.contract_call.contract_id === contractID) {
			client.guilds.cache.forEach(async (guild) => {
				const channel = await guild.channels.fetch(channels.mempool);
				if (!channel) return;
				const tx_id = mempool.tx_id;
				const address = mempool.sender_address;
				const functionName = mempool.contract_call.function_name;
				const fee = mempool.fee_rate / (10 ** 6);
				const nonce = mempool.nonce;
				const BNS = await getBNS(address);
				const embed = new MessageEmbed()
					.setTitle('New Transaction')
					.setColor('#0099ff')
					.setURL(`https://explorer.stacks.co/txid/${tx_id}`)
					.setFields(
						{ name: 'Transaction ID', value: tx_id.toString() },
						{ name: 'Sender', value: BNS.toString() },
						{ name: 'Function', value: functionName.toString() },
						{ name: 'Fee', value: fee.toString() },
						{ name: 'Nonce', value: nonce.toString() },
					);
				channel.send({ embeds: [embed] });
			});
		}
		else {return;}
	});
};
