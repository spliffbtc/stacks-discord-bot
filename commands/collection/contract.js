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
		// Send Message
		message.channel.send({ embeds: [embed] });
		// logging
		
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name} with the following arguments: ${message.content.slice(message.content.indexof(' ') + 1)}`);
		}
	},
};
