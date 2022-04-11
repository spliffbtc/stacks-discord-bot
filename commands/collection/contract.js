const { MessageEmbed } = require('discord.js');
const config = require('../../collectionConfig.json');
const contract = config.contract;

module.exports = {
	name: 'contract',
	aliases: ['contract, smartcontract'],
	description: 'Get the smart contract details',
	usage: '',
	category: 'collection',
	args: false,

	async execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${contract.contractName}`)
			.setURL(contract.txURL)
			.addFields(
				{
					name: 'Contract Name',
					value: `${contract.contractName}`,
				},
				{
					name: 'Contract Address',
					value: `${contract.contractAddress}`,
				},				{
					name: 'Transaction ID',
					value: `${contract.txID}`,
				},
				{
					name: 'Block Height',
					value: `${contract.blockHeight}` },
			);
		message.channel.send({ embeds: [embed] });
	},
};
