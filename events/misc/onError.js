module.exports = {
	name: 'onError',
	async execute(error, message) {
		console.error(error);
		message.channel.send(`Error: ${error}`);
	},
};