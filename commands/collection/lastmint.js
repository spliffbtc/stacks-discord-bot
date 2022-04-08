const axios = require('axios').default;
exports.axios = axios;
const { MessageEmbed } = require('discord.js');
const getBNS = require('../../util/stacksAPI/getBNS.js');
let stacksAPI = require('../../util/stacksAPI.js');
stacksAPI = stacksAPI();
let collection = require('../../model/collection.js');
collection = collection();

// Get the last minted NFT and who it was minted by
module.exports = {
	name: 'lastmint',
	aliases: ['lastminted', 'last'],

	// Get last minted
	async execute(message) {
		const resp = await axios.get(stacksAPI.nft.mints, {
			params: {
				asset_identifier: collection.asset_identifier,
				limit: 1,
				offset: 0,
			},
		});
		const lastMinted = resp.data.results[0];
		const nftID = lastMinted.value.repr.substring(1);
		const address = lastMinted.recipient;
		const BNS = await getBNS(address);

		// Create Message Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Last Minted: #' + nftID)
			.setImage(
				`https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk${nftID}.png`,
			)
			.setURL(`${collection.collectionWebsite}/details/${nftID}`)
			.addFields(
				{
					name: `${collection.nftPrefix} #`,
					value: `${nftID}`,
				},

				{
					name: 'Minted By',
					value: `${BNS}`,
				},
				{
					name: 'Link',
					value: `https://freepunks.xyz/details/${nftID}`,
				},
			);
		message.channel.send({ embeds: [embed] });

		return { embed };
	},
};
