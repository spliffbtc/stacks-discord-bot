module.exports = {
	name: 'onError',
	async execute(error, message) {
		console.log(error);
		message.channel.send(`Error: ${error}`);
	},
};