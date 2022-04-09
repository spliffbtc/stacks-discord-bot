const axios = require('axios').default;

module.exports = async () => {
	const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
	const STXUSD = data.blockstack.usd;
	return STXUSD;
};