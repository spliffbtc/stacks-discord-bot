const axios = require('axios');
const { MessageEmbed } = require('discord.js');

axios
	.get('https://api.coingecko.com/api/v3/simple/price', {
		params: {
			ids: 'blockstack',
			vs_currencies: 'USD',
		},
	})
	.then((response) => {
		let _a, _b;
		stxPrice =
			(_b =
				(_a =
					response === null || response === void 0 ? void 0 : response.data) ===
					null || _a === void 0
					? void 0
					: _a.blockstack) === null || _b === void 0
				? void 0
				: _b.usd;
		return stxPrice;
	})
	.catch((error) => console.log(error));

module.exports = {
	name: 'stxprice',
	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`STX:USD ($${stxPrice})`)
			.setDescription(`The current price of STX is $${stxPrice} USD`)
			.setThumbnail(
				'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
			)
			.setURL('https://www.coingecko.com/en/coins/stacks')
			.setTimestamp();
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
