const axios = require('axios').default;
exports.axios = axios;
let stacksAPI = require('../stacksAPI.js');
stacksAPI = stacksAPI();
let collection = require('../../model/collection.js');
collection = collection();

module.exports = async (address) => {
	try {
		const resp = await axios.get(
			`${stacksAPI.bns.address}/${stacksAPI.blockchain}/${address}`,
			{
				params: { blockchain: stacksAPI.blockchain, address: address },
			},
		);
		if (resp.data.names.toString() === '' || null || undefined || NaN) {
			const BNS = address;
			const response = BNS;

			return response;
		}
		else {
			const BNS = resp.data.names.toString();
			const response = BNS;

			return response;
		}
	}
	catch (err) {
		console.log(err);
	}
};
