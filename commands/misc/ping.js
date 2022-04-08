module.exports = {
	name: 'ping',
	execute(message, args) {
		message.channel.send({ content: 'Pong.' });
	},
};
