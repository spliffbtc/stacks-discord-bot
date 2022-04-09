const axios = require('axios').default;
const getCollection = require('../model/collection.js');
const collection = getCollection();

module.exports = async () => {
	const { data } = await axios.get(`https://api.stacksdata.info/nft/contracts/${collection.contractID}.${collection.contractName}/floor`);
	const floor = data[0].floor;
	return floor;
};