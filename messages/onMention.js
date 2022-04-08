const config = require('../config.json');

module.exports = {
	async execute(message) {
		return message.channel.send(
			`What up, ${message.author}! My prefix is \`${config.prefix}\`, get help by \`${config.prefix}help\``,
		);
	},
};
