const config = require('../botConfig.json');

module.exports = {
	async execute(message) {
		return message.channel.send(
			`Hi, ${message.author}! My prefix is \`${config.prefix}\`, get help by \`${config.prefix}help\``,
		);
	},
};
