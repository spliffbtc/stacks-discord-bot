const { MessageEmbed } = require('discord.js');
const getFloor = require('../../util/stacksonchainAPI/get-floor.js');

module.exports = {
	name: 'floor',
	aliases: ['floor', 'floor-price'],
	description: 'Get the current floor price of the collection',
	usage: 'floor',
	category: 'market',
	args: false,

	async execute(message) {
		const response = await getFloor();
		const floor = response[0].floor;
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Floor Price: ${floor} STX`)
			.setDescription(`The current floor price is ${floor} STX`)
			.setThumbnail(
				'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
			)
			.setURL('')
			.setTimestamp();
		// Send Message
		message.channel.send({ embeds: [embed] });
		// Logging
		if (module.exports.args === false) {
			logger.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			logger.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};