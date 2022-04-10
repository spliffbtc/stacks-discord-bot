const { version } = require('discord.js');
const { codeBlock } = require('@discordjs/builders');
const { DurationFormatter } = require('@sapphire/time-utilities');
const config = require('../../botConfig.json');
const durationFormatter = new DurationFormatter();

module.exports = {
	name: 'stats',
	alises: ['stats'],
	description: 'Gives some useful bot statistics',
	category: 'admin',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	cooldown: 5,
	execute(client, message) {
		const duration = durationFormatter.format(client.uptime);
		const guildID = config.discord.guildID;
		const guild = client.guild;
		const users = guild.members.cache.filter(member => !member.user.bot).size;
		const channels = guild.channels.cache.size;

		const stats = codeBlock('asciidoc',
			`= STATISTICS =
			• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
			• Uptime     :: ${duration}
			• Users      :: ${users}
			• Channels   :: ${channels}
			• Discord.js :: ${version}
			• Node       :: ${process.version}`);
		message.channel.send({
			content: `stats ${stats }` });

	},
};
