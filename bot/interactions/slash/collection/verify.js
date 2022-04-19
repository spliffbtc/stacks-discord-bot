const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { AppConfig, UserSession, showConnect } = require ('@stacks/connect');
const config = require('../../../../botConfig.json');

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });
async function authenticate() {
	showConnect({ appDetails: {
		name: 'stacks-discord-bot',
		description: 'Stacks Discord Bot',
		icon: 'https://stacks.network/images/stacks-icon-128.png',
	},
	redirectTo: `https://discordapp.com/channels/${config.guildID}/${config.channels.general}`,
	onCancel: () => {console.log('Something went wrong.');},
	onFinish: () => {console.log('Something went right.');}, userSession });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDefaultPermission(true)
		.setDescription(
			'Verify your Stacks Wallet.',
		),
	async execute(interaction) {

		// await authenticate();

		// Create Embed
		const embed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle('Verify Wallet')
			.setDescription(
				'You\'ve been verified! Welcome to Stacks Discord Bot server!',
			)
			.setTimestamp();
		// await interaction.reply({ embeds: [embed] });
		await interaction.reply('Still working on it... :thinking:');
	},
};