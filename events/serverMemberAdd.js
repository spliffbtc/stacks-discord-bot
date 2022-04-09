const { MessageEmbed } = require('discord.js');
const config = require('../botConfig.json');
const welcomeChannel = config.channels.welcome;

module.exports = {
	name: 'welcome',
	aliases: ['welcome'],
	description: 'Welcome a new member to the server',
	usage: 'welcome',
	category: 'server',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	args: false,
	cooldown: 5,
	async execute(client, message) {
		await client.on('guildMemberAdd', member => {
			member.roles.add(welcomeChannel);
			const welcomeEmbed = new MessageEmbed();
			welcomeEmbed.setTitle('Welcome');
			welcomeEmbed.setDescription(`Welcome to the server, ${member}!`);
			welcomeEmbed.setColor('#0099ff');
			welcomeEmbed.setThumbnail(member.user.displayAvatarURL());
			welcomeEmbed.setTimestamp();
			welcomeEmbed.setFooter(`${member.user.tag}`, member.user.displayAvatarURL());
			welcomeChannel.send({ embeds: [welcomeEmbed] });
		});
	},
};
