const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a poll.')
		.setDefaultPermission(true)
		.addStringOption((option) =>

			option
				.setName('question')
				.setDescription('The question of the poll.')
				.setRequired(true),
		)
		.addStringOption((option) =>

			option
				.setName('option1')
				.setDescription('The first option of the poll.')
				.setRequired(true),
		)
		.addStringOption((option) =>

			option
				.setName('option2')
				.setDescription('The second option of the poll.')
				.setRequired(true),
		)
		.addStringOption((option) =>

			option
				.setName('option3')
				.setDescription('The third option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option4')
				.setDescription('The fourth option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option5')
				.setDescription('The fifth option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option6')
				.setDescription('The sixth option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option7')
				.setDescription('The seventh option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option8')
				.setDescription('The eighth option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option9')
				.setDescription('The ninth option of the poll.'),
		)
		.addStringOption((option) =>

			option
				.setName('option10')
				.setDescription('The tenth option of the poll.'),
		),
	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		let name = interaction.options.getString('command');
		const embed = new MessageEmbed()
			.setColor(0x4286f4);
		if (name) {
			name = name.toLowerCase();
			embed.setTitle(`Poll for \`${name}\` command`);
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
			embed.setDescription('No command name provided.').setColor('YELLOW');
		}
		await interaction.message.channel.send({ embeds: [embed] });
	},
};
