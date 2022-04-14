module.exports = {
	name: 'clearchat',
	aliases: ['clearchat'],
	description: 'Deletes the last 100 messages in the current channel.',
	usage: 'dev',
	category: 'admin',
	args: false,
	adminOnly: true,

	async execute(message) {
		let fetched;
		do {
			fetched = await message.channel.messages.fetch({ limit: 100 });
			message.channel.bulkDelete(fetched);
		}
		while (fetched.size >= 2);
		message.channel.send({ content: 'Messages deleted.' });
	},
};
