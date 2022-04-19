const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDefaultPermission(true)
		.setDescription(
			'Developer Placeholder',
		),
	async execute(interaction) {
		// Create Embed
		const embed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle('Developer Placeholder')
			.setDescription(
				'This is a placeholder!',
			)
			.setTimestamp();
		// await interaction.reply({ embeds: [embed] });
		await interaction.reply('Still working on this feature... :thinking:');
	},
};