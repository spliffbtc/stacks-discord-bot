const axios = require('axios').default;

module.exports = async (tx_id) => {
	const data = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${tx_id}`);
	const results = data;
	return results ;
};