const axios = require('axios').default;
exports.axios = axios;

module.exports = async (bns) => {
	try {
		const resp = await axios.get(
			`https://stacks-node-api.mainnet.stacks.co/v1/names/${bns}`,
			{ params: { name: bns } },
		);
		if (resp.data.address.toString() === '' || null || undefined || NaN) {
			const address = 'No address found';
			const response = address ;
			return response;
		}
		else {
			const address = resp.data.address.toString();
			const response = address ;
			return response;
		}
	}
	catch (error) {console.error(error);}
};
