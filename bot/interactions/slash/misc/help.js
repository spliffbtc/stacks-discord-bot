const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDefaultPermission(true)
		.setDescription(
			'List all commands of bot or info about a specific command.',
		)
		.addStringOption((option) =>
			option
				.setName('command')
				.setDescription('The specific command to see the info of.'),
		),
	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		let name = interaction.options.getString('command');
		const embed = new MessageEmbed()
			.setColor(0x4286f4);
		if (name) {
			name = name.toLowerCase();
			embed.setTitle(`Help for \`${name}\` command`);
			if (commands.has(name)) {
				const command = commands.get(name).data;
				if (command.description) embed.setDescription(command.description + '\n\n**Parameters:**');
				command.options.forEach(option => {
					let content = option.description;
					if (option.choices) {
						let choices = '\nChoices: ';
						option.choices.forEach(choice => choices += choice + ', ');
						choices = choices.slice(0, -2);
						content += choices;
					}
					if (!option.required) content += '\n*Optional*';
					embed.addField(option.name, content.trim(), true);
				});
			}
			else {
				embed.setDescription(`No slash command with the name \`${name}\` found.`).setColor('YELLOW');
			}
		}
		else {
			embed
				.setTitle('List of all my slash commands')
				.setDescription(
					'`' + commands.map((command) => command.data.name).join('`, `') + '`',
				);
		}
		await interaction.reply({
			embeds: [embed],
		});
	},
};