const config = require('../botConfig.json');

module.exports = {
	async execute(message) {
		return message.channel.send(
			`Hi, ${message.author}! My prefix is \`${config.commandPrefix}\`, get help by \`${config.commandPrefix}help\``,
		);
	},
};
