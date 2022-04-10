const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const welcomeChannel = config.discord.channels.welcome;

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		try {
			const welcomeEmbed = new MessageEmbed();
			welcomeEmbed.setTitle('Welcome');
			welcomeEmbed.setDescription(`Welcome to the server, ${member}!`);
			welcomeEmbed.setColor('#0099ff');
			welcomeEmbed.setThumbnail(member.user.displayAvatarURL());
			welcomeEmbed.setTimestamp();
			console.log(`${member.user.username} has joined the server.`);
			member.guild.channels.get(welcomeChannel).send({ embeds: [welcomeEmbed] });
		}
		catch (error) {
			console.error(error);
		}
	},
};