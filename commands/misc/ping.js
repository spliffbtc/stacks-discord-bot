module.exports = {
	name: 'ping',
	execute(message) {
		message.channel.send({ content: 'Pong.' });
	},
};
