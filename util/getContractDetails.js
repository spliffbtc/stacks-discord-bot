const axios = require('axios').default;
const config = require('../botConfig.json');

module.exports = async () => {
	const contractIdentifier = `${config.collection.contract.contractAddress}.${config.collection.contract.contractName}`;
	const { data } = await axios.get('https://stacks-node-api.mainnet.stacks.co/extended/v1/contract/' + contractIdentifier);
	const tx_id = data.tx_id;
	const canonical = data.canonical;
	const contract_id = data.contract_id;
	const block_height = data.block_height;
	// const source_code = data.source_code;
	const results = { tx_id, canonical, contract_id, block_height };
	return { results };
};