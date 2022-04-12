const axios = require('axios').default;
const collection = require('../../../collectionConfig.json');

module.exports = async () => {
	const principal = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const data = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${principal}/assets`);
	const results = data;
	console.log(results);
};