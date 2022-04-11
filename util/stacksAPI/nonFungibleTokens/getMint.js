const axios = require('axios').default;
const getBNS = require('../names/getBNS.js');
const collection = require('../../../collectionConfig.json');


module.exports = async () => {
	const assetIdentifier = `${collection.contract.contractAddress}.${collection.contract.contractName}::${collection.contract.assets.assetName}`;
	const { data } = await axios.get('https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/mints',
		{
			params: {
				asset_identifier: assetIdentifier,
				limit: 1,
				offset: 0,
			},
		});
	const lastMinted = await data.results[0];
	const nftID = lastMinted.value.repr.substring(1);
	const recipient = await getBNS(lastMinted.recipient);
	const results = {
		nftID,
		recipient };
	return results;

};
