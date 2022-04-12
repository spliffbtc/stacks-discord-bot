const { MessageEmbed } = require('discord.js');
const getVolume = require('../../util/stacksonchainAPI/getvolume.js');

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
		message.channel.send({ embeds: [embed] });
	},
};
