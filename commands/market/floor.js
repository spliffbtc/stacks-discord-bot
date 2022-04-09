const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const getCollection = require('../../model/collection.js');
const collection = getCollection();

module.exports = {
	name: 'floor',
	async execute(message) {
		const floorPrice = await axios
			.get(
				`https://api.stacksdata.info/nft/contracts/${collection.contractID}.${collection.contractName}/floor`,
			)
			.then(async function(response) {
				const currentFloor = response.data[0].floor;
				return currentFloor;
			});
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
