const axios = require('axios').default;
exports.axios = axios;

module.exports = async (address) => {
	try {
		const resp = await axios.get(
			`https://stacks-node-api.mainnet.stacks.co/v1/addresses/stacks/${address}`,
			{
				params: { blockchain: 'stacks', address: address },
			},
		);
		if (resp.data.names.toString() === '' || null || undefined || NaN) {
			const bns = address;
			const response = bns ;
			return response;
		}
		else {
			const bns = resp.data.names.toString();
			const response = bns ;
			return response;
		}
	}
	catch (error) {
		console.error(error);
	}
};
