const { AppConfig, UserSession, showConnect, openContractCall } = require('@stacks/connect');
const { StacksTestnet } = require('@stacks/network');

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

module.exports = function(logger, client) {
	showConnect({
		appDetails: {
			name: 'stacks-discord-bot',
			icon: window.location.origin + '/my-app-logo.svg',
		},
		redirectTo: '/',
		onFinish: () => {
			const userData = userSession.loadUserData();
		// Save or otherwise utilize userData post-authentication
		},
		userSession: userSession,
	});

	const address = userSession.loadUserData().profile.stxAddress;
	const mainnetAddress = address.mainnet;
	const testnetAddress = address.testnet;

	openContractCall({
		// openContractCall
		onFinish: (data) => {
			console.log('Stacks Transaction:', data.stacksTransaction);
			const explorerTransactionUrl = `https://explorer.stacks.co/txid/${data.txId}`;
			console.log('Transaction ID:', data.txId);
			console.log('Raw transaction:', data.txRaw);
			console.log(explorerTransactionUrl);
		},
	});

};
