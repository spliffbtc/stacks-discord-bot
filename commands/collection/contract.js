const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = {
	name: 'contract',
	aliases: ['contract, smartcontract'],
	description: 'Get the smart contract details',
	usage: '',
	category: 'collection',
	args: false,

	async execute(message) {
		const txID = '0xc68d03331af54894214e06e47e30e28d549a90dfbec6ed1d71773910d1dd5090';
		const canonical = true;
		const contractID = 'SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0';
		const blockHeight = 26320;
		const contractName = collection.contract.contractName;
		const contractAddress = collection.contract.contractAddress;
		const txURL = `https://explorer.stacks.co/txid/${txID}`;
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${contractName}`)
			.setURL(txURL)
			.addFields(
				{
					name: 'Contract Name',
					value: `${contractName}`,
				},
				{
					name: 'Contract Address',
					value: `${contractAddress}`,
				},				{
					name: 'Transaction ID',
					value: `${txID}`,
				},
				{
					name: 'Block Height',
					value: `${blockHeight}` },
			);
		message.channel.send({ embeds: [embed] });
	},
};
