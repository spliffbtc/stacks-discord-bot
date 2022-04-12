const { version } = require('discord.js');
const { codeBlock } = require('@discordjs/builders');
const { DurationFormatter } = require('@sapphire/time-utilities');
const durationFormatter = new DurationFormatter();

module.exports = {
	name: 'stats',
	alises: ['stats'],
	description: 'Gives some useful bot statistics',
	usage: 'stats',
	category: 'admin',
	args: true,

	execute(client, message) {
		const duration = durationFormatter.format(client.uptime);
		// const guild = client.guild;
		// const users = guild.members.cache.filter(member => !member.user.bot).size;
		// const channels = guild.channels.cache.size;

		const stats = codeBlock('asciidoc',
			`= STATISTICS =
			• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
			• Uptime     :: ${duration}
			• Users      :: in dev
			• Channels   :: in dev
			• Discord.js :: ${version}
			• Node       :: ${process.version}`);
		message.channel.send({
			content: `stats ${stats }` });

	},
};
