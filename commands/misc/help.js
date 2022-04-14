const config = require('../../botConfig.json');
const prefix = config.commandPrefix;
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'List all commands of bot or info about a specific command.',
	usage: '[command name]',
	category: 'general',
	args: false,

	execute(message, args) {
		const { commands } = message.client;
		if (!args.length) {
			const helpEmbed = new MessageEmbed()
				.setColor(0x4286f4)
				.setURL(process.env.URL)
				.setTitle('List of all my commands')
				.setDescription(
					'`' + commands.map((command) => command.name).join('`, `') + '`',
				)
				.addField(
					'Usage',
					`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,
				);
			return message.author
				.send({ embeds: [helpEmbed] })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply({
						content: 'I\'ve sent you a DM with all my commands!',
					});
				})
				.catch((error) => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error,
					);
					message.reply({ content: 'It seems like I can\'t DM you!' });
				});
		}
		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));
		if (!command) {
			return message.reply({ content: 'That\'s not a valid command!' });
		}
		const embed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle('Command Help');
		if (command.description) {embed.setDescription(`${command.description}`);}
		if (command.aliases) {
			embed
				.addField('Aliases', `\`${command.aliases.join(', ')}\``, true)
				.addField('Cooldown', `${command.cooldown || 3} second(s)`, true);
		}
		if (command.usage) {
			embed.addField(
				'Usage',
				`\`${prefix}${command.name} ${command.usage}\``,
				true,
			);
		}
		// Send Message
		message.channel.send({ embeds: [embed] });
		// Logging
		if (module.exports.args === false) {
			logger.info(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name}`);
		}
		else {
			logger.info(`${message.author.tag} used the ${module.exports.name} command on ${message.guild.name} with the following arguments: ${args}`);
		}
	},
};