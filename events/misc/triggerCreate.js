module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const args = message.content.split(/ +/);
		if (message.author.bot) return;
		let check;
		await message.client.triggers.every(async (trigger) => {
			if (check == 1) return false;
			await trigger.name.every(async (name) => {
				if (check == 1) return false;
				if (message.content.includes(name)) {
					try {
						trigger.execute(message, args);
					}
					catch (error) {
						console.error(error);
						message.reply({
							content: 'there was an error trying to execute that trigger!',
						});
					}
					check = 1;
					return false;
				}
			});
		});
	},
};
