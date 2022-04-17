module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content:
				'Darn! There was an issue while fetching this select menu option!',
			ephemeral: true,
		});
		return;
	},
};
