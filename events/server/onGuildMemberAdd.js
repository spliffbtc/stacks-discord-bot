const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const welcomeChannel = config.channels.welcome;

module.exports = {
	name: 'guildMemberAdd',
	execute(logger, client) {
		try {
			const newMember = client.guilds.cache.get(config.guildID).members.cache.get(logger, client.user.id);
			const embed = new MessageEmbed();
			embed.setTitle('Welcome');
			embed.setDescription(`Welcome to the server, ${newMember}!`);
			embed.setColor('#0099ff');
			embed.setThumbnail(newMember.displayAvatarURL());
			embed.setTimestamp();
			logger.info(`${newMember.username} has joined the server.`);
			client.member.guild.channels.cache.get(welcomeChannel).send({ embeds: [embed] });
		}
		catch (error) {
			console.error(error);
		}
	},
};