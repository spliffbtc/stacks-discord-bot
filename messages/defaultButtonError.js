module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content: 'Hey! There was an issue while fetching this button!',
			ephemeral: true,
		});
		return;
	},
};
