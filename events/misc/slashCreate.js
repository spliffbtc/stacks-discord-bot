module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const { client } = interaction;
		if (!interaction.isCommand()) return;
		const command = client.slashCommands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'There was an issue while executing that command!',
				ephemeral: true,
			});
		}
	},
};
