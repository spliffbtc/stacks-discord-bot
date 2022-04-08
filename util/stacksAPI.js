module.exports = (contractID) => {
	const stacksAPI = {
		blockchain: 'stacks',
		bns: { address: 'https://stacks-node-api.mainnet.stacks.co/v1/addresses' },
		nft: {
			mints:
				'https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/mints',

			holdings:
				'https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings',
			metadata: `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/${contractID}/nft/metadata`,
		},
	};
	return stacksAPI;
};
