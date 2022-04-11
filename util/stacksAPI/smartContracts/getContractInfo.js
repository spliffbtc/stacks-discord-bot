const axios = require('axios').default;
const collection = require('../../../collectionConfig.json');

module.exports = async () => {
	const contractIdentifier = `${collection.contract.contractAddress}.${collection.contract.contractName}`;
	const { data } = await axios.get('https://stacks-node-api.mainnet.stacks.co/extended/v1/contract/' + contractIdentifier);
	const tx_id = data.tx_id;
	const canonical = data.canonical;
	const contract_id = data.contract_id;
	const block_height = data.block_height;
	// const source_code = data.source_code;
	const results = { tx_id, canonical, contract_id, block_height };
	return { results };
};