module.exports = (message) => {
	const filter = (reaction, user) => {
		return reaction.emoji.name === '👀' && user.id === message.author.id;
	};
	const collector = message.createReactionCollector(filter, { time: 60000 });
	collector.on('collect', (reaction, user) => {
		logger.info(`Collected ${reaction.emoji.name} from ${user.username}`);
	});
	collector.on('end', collected => {
		logger.info(`Collected ${collected.size} reqactions`);
		return collected;
	});
};