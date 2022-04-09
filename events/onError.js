module.exports = {
	'logError': (error, message) => {
		console.log(error);
		message.channel.send(`Error: ${error}`);
	},
};