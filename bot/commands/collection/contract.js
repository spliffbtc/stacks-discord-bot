const { MessageEmbed } = require('discord.js');
const config = require('../../../collectionConfig.json');
const contract = config.contract;

module.exports = {
	name: 'contract',
	aliases: ['contract, smartcontract'],
	description: 'Get the smart contract details',
	usage: '',
	category: 'collection',
	args: false,

	async execute(message) {
		// Set Variables
		const contractName = contract.contractName;
		const contractAddress = contract.contractAddress;
		const txID = contract.txID;
		const blockHeight = contract.blockHeight;

		// Create Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${contract.contractName}`)
			.setURL(contract.txURL)
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


		// Send Message
		message.channel.send({ embeds: [embed] });


		// Logging
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			const args = module.exports.args;
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};
