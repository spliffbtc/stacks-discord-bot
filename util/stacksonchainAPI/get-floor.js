const axios = require('axios').default;
const collection = require('../../collectionConfig.json');

module.exports = async () => {
	const { data } = await axios.get(`https://api.stacksdata.info/nft/contracts/${collection.contract.contractAddress}.${collection.contract.contractName}/floor`);
	const response = data;
	return response;
};