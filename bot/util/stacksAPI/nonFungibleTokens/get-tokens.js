const axios = require('axios').default;

module.exports = async (args) => {
	const address = args;
	const { data } = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${address}`);
	const response = data.total;
	return response;
};