const { MessageEmbed } = require('discord.js');
const getTransactions = require('../../util/stacksonchainAPI/getTransactions.js');

module.exports = {
	name: 'transactions',
	aliases: ['transactions', 'dailytx', 'dailytxs'],
	description: 'Get the number of transactions per day of the collection',
	usage: 'transactions',
	category: 'market',
	args: false,

	async execute(message) {
		const response = await getTransactions();
		const transactions = response[0].transactions;
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Transactions per Day: ${transactions}`)
			.setDescription(`The current number of transactions per day is ${transactions}`)
			.setThumbnail(
				'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
			)
			.setURL('')
			.setTimestamp();
		// Send Message
		message.channel.send({ embeds: [embed] });
		// Logging
		
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};