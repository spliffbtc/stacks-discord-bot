module.exports = {
	name: ['hello'],
	execute(message) {
		message.channel.send({
			content: 'Hello there!',
		});
	},
};
