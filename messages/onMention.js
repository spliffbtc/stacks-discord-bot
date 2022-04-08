const env = require('dotenv');
const prefix = process.env.prefix;

module.exports = {
	async execute(message) {
		return message.channel.send(
			`What up, ${message.author}! My prefix is \`${prefix}\`, get help by \`${prefix}help\``,
		);
	},
};
