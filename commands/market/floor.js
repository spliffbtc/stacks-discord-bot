const { MessageEmbed } = require('discord.js');
const getFloor = require('../../util/stacksonchainAPI/getFloor.js');

module.exports = {
	name: 'floor',
	aliases: ['floor', 'floor-price'],
	description: 'Get the current floor price of the collection',
	usage: 'floor',
	category: 'market',
	args: false,

	async execute(message) {
		const floor = await getFloor();
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Floor Price: ${floor} STX`)
			.setDescription(`The current floor price is ${floor} STX`)
			.setThumbnail(
				'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
			)
			.setURL('')
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};
