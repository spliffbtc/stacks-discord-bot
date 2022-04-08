module.exports = {
	name: ['hi frens'],
	execute(message, args) {
		message.channel.send({
			content: 'What\'s up, punk?',
		});
	},
};
