const { MessageEmbed } = require('discord.js');
const config = require('../botConfig.json');
const welcomeChannel = config.channels.welcome;

module.exports = (client) => {
	client.on('guildMemberAdd', async (member) => {
		const welcomeEmbed = new MessageEmbed();
		welcomeEmbed.setTitle('Welcome');
		welcomeEmbed.setDescription(`Welcome to the server, ${member}!`);
		welcomeEmbed.setColor('#0099ff');
		welcomeEmbed.setThumbnail(member.user.displayAvatarURL());
		welcomeEmbed.setTimestamp();
		console.log(`${member.user.username} has joined the server.`);
		member.guild.channels.get(welcomeChannel).send({ embeds: [welcomeEmbed] });
	});
};
