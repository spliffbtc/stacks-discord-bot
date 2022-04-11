const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const welcomeChannel = config.discord.channels.welcome;

module.exports = {
	name: 'guildMemberAdd',
	execute(client) {
		try {
			const newMember = client.guilds.cache.get(config.discord.guild).members.cache.get(client.user.id);
			const welcomeEmbed = new MessageEmbed();
			welcomeEmbed.setTitle('Welcome');
			welcomeEmbed.setDescription(`Welcome to the server, ${newMember}!`);
			welcomeEmbed.setColor('#0099ff');
			welcomeEmbed.setThumbnail(newMember.displayAvatarURL());
			welcomeEmbed.setTimestamp();
			console.log(`${newMember.username} has joined the server.`);
			client.member.guild.channels.cache.get(welcomeChannel).send({ embeds: [welcomeEmbed] });
		}
		catch (error) {
			console.error(error);
		}
	},
};