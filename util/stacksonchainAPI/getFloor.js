const axios = require('axios').default;
const config = require('../../botConfig.json');
const collection = config.collection;

module.exports = async () => {
	const { data } = await axios.get(`https://api.stacksdata.info/nft/contracts/${collection.contract.contractName}/floor`);
	const floor = data[0].floor;
	return floor;
};