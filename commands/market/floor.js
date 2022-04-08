const axios = require('axios');
const { MessageEmbed } = require('discord.js');

// Get current collection floor price in STX
module.exports = {
	name: 'floor',
	async execute(message) {
		// Get Floor Price
		const floorPrice = await axios
			.get(
				'https://api.stacksdata.info/nft/contracts/SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0/floor',
			)
			.then(async function(response) {
				const floorPrice = response.data[0].floor;
				return floorPrice;
			});
		// Send Message
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Floor Price: ${floorPrice} STX`)
			.setDescription(`The current floor price is ${floorPrice} STX`)
			.setThumbnail(
				'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
			)
			.setURL('')
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
