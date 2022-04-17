module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const { client } = interaction;
		if (!interaction.isSelectMenu()) return;
		const command = client.selectCommands.get(interaction.customId);
		if (!command) {
			await require('../messages/defaultSelectError').execute(interaction);
			return;
		}
		try {
			await command.execute(interaction);
			return;
		}
		catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an issue while executing that select menu option!',
				ephemeral: true,
			});
			return;
		}
	},
};
