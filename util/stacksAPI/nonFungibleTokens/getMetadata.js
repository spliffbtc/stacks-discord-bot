const axios = require('axios').default;
const collection = require('../../../collectionConfig.json');

module.exports = async () => {
	const contractIdentifier = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const data = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/${contractIdentifier}/nft/metadata`);
	const results = data;
	return results ;
};