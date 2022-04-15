const { MessageEmbed } = require('discord.js');
const getVolume = require('../../util/stacksonchainAPI/get-volume.js');

module.exports = {
	name: 'volume',
	aliases: ['volume', 'daily-volume'],
	description: 'Get the current daily volume of the collection',
	usage: 'volume',
	category: 'market',
	args: false,

	async execute(message) {
		const response = await getVolume();
		const dailyVolume = response[0].volume;
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Daily Volume: ${dailyVolume} STX`)
			.setDescription(`The current daily volume is ${dailyVolume} STX`)
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
