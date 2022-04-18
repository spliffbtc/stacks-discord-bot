const { MessageEmbed } = require('discord.js');
const config = require('../../../botConfig.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(client) {
		try {
			const newMember = await client.guild.channels.cache.get(config.guildID).members.cache.get(client.user.id);
			const welcomeChannel = config.channels.welcome;
			console.log(newMember);
			console.log(welcomeChannel);
			const embed = new MessageEmbed()
				.setTitle('Welcome')
				.setDescription(`Welcome to the server, ${newMember}!`)
				.setColor('#0099ff')
				.setThumbnail(newMember.displayAvatarURL())
				.setTimestamp();
			console.log({ embed });
			client.channels.cache.get(welcomeChannel).send({ embed });
		}
		catch (error) {
			console.log(error);
		}
	},
};