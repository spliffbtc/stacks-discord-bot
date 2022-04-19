const { SlashCommandBuilder } = require('@discordjs/builders');
const pollEmbed = require('../../../util/misc/poll-embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a poll.')
		.setDefaultPermission(true)

		// Add Inputs: Title
		.addStringOption((option) =>
			option
				.setName('title')
				.setDescription('The question of the poll.')
				.setRequired(true),
		)
		// Add Inputs: Timeout
		.addNumberOption((option) =>
			option
				.setName('timeout')
				.setDescription('The time in seconds for the poll to end.')
				.setRequired(true),
		)
		// Add Inputs: Option 1
		.addStringOption((option) =>
			option
				.setName('option1')
				.setDescription('The first option of the poll.')
				.setRequired(true),
		)
		// Add Inputs: Option 2
		.addStringOption((option) =>
			option
				.setName('option2')
				.setDescription('The second option of the poll.')
				.setRequired(true),
		)
		// Add Inputs: Option 3
		.addStringOption((option) =>
			option
				.setName('option3')
				.setDescription('The third option of the poll.'),
		),
	async execute(interaction, message, args) {
		// Set Variables
		const title = interaction.getOption('title');
		const options = [interaction.getOption('option1'), interaction.getOption('option2'), interaction.getOption('option3')];
		const timeout = interaction.getOption('timeout');


		// Create Embed
		const embed = pollEmbed(message, title, options, timeout);


		// Send Message
		await interaction.message.channel.send({ embeds: [embed] });


		// Logging
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};
