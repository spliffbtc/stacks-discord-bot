const axios = require('axios').default;
const collection = require('../../../collectionConfig.json');

module.exports = async (tx_id) => {
	const contractIdentifier = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const data = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${tx_id}`);
	const results = data;
	return results ;
};