const config = require('../botConfig.json');

module.exports = {
	async execute(message) {
		return message.channel.send(
			`Hi, ${message.author}! My prefix is \`${config.discord.prefix}\`, get help by \`${config.discord.prefix}help\``,
		);
	},
};
