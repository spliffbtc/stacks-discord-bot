const axios = require('axios').default;
const getBNS = require('../names/getNamesOwnedByAddress.js');
const config = require('../../../botConfig.json');
const collection = config.collection;

module.exports = async () => {
	const { data } = await axios.get('https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/mints',
		{
			params: {
				asset_identifier: collection.asset_identifier,
				limit: 1,
				offset: 0,
			},
		});
	const lastMinted = data.results[0];
	const nftID = lastMinted.value.repr.substring(1);
	const recipient = await getBNS(lastMinted.recipient);
	const results = {
		nftID,
		recipient };
	return results;

};
