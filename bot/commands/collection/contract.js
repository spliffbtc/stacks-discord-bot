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


		// Create Embed
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
