const fs = require('fs');

module.exports = {
	name: 'reload',
	alises: ['reload'],
	description: 'Reloads a command',
	usage: 'reload <command name>',
	category: 'admin',
	permissions: 'SEND_MESSAGES',
	clientPerms: 'SEND_MESSAGES',
	guildOnly: false,
	args: true,
	adminOnly: true,
	cooldown: 5,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
			);
		if (!command) {
			return message.channel.send({
				content: `There is no command with name or alias \`${commandName}\`, ${message.author}!`,
			});
		}
		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find((folder) =>
			fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`),
		);
		delete require.cache[
			require.resolve(`../${folderName}/${command.name}.js`)
		];
		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send({
				content: `Command \`${newCommand.name}\` was reloaded!`,
			});
		}
		catch (error) {
			console.error(error);
			message.channel.send({
				content: `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``,
			});
		}
	},
};
