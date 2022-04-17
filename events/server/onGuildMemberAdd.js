const { MessageEmbed } = require('discord.js');
const config = require('../../botConfig.json');
const welcomeChannel = config.channels.welcome;

module.exports = {
	name: 'guildMemberAdd',
	async execute(client) {
		try {
			const newMember = await client.guilds.cache.get(config.guildID).members.cache.get(client.user.id);
			const embed = new MessageEmbed();
			embed.setTitle('Welcome');
			embed.setDescription(`Welcome to the server, ${newMember}!`);
			embed.setColor('#0099ff');
			embed.setThumbnail(newMember.displayAvatarURL());
			embed.setTimestamp();
			console.log(`${newMember.username} has joined the server.`);
			client.member.guild.channels.cache.get(welcomeChannel).send({ embeds: [embed] });
		}
		catch (error) {
			console.error(error);
		}
	},
};