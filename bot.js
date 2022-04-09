const env = require('dotenv').config();
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const Routes = require('discord-api-types/v9');
const token = process.env.TOKEN;
const getDiscordServer = require('./model/discordServer.js');
const discordServer = getDiscordServer();
const guildID = discordServer.guildID;
const botChannel = discordServer.channels.stacks.microblock;

const client = new Client({
	intents: [32767],
});

// Event Handler
const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client),
		);
	}
}

// Define Command Collections
client.commands = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.contextCommands = new Collection();
client.cooldowns = new Collection();
client.triggers = new Collection();

// Register Commands: Message Based
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Register Commands: Slash Commands
const slashCommands = fs.readdirSync('./interactions/slash');
for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/slash/${module}`)
		.filter((file) => file.endsWith('.js'));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

// Register Commands: Slash-Commands in Discord API
const rest = new REST({
	version: '9',
}).setToken(token);
const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];
(async function() {
	try {
		console.log('Started refreshing application (/) commands.');
		if (process.env.NODE_ENV === 'PROD') {
			await rest.put(
				//	Deploy Globally: Routes.applicationCommands(client_id)
				Routes.applicationGuildCommands(guildID),
				{
					body: commandJsonData,
				},
			);
		}
		else {
			await rest.put(
				//	Deploy Globally: Routes.applicationCommands(client_id)
				Routes.applicationGuildCommands(guildID),
				{
					body: commandJsonData,
				},
			);
		}

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
});

// Registration of Message Based Chat Triggers
const triggerFolders = fs.readdirSync('./triggers');
for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}

// Bug: Stacks Event Based Chat Triggers


// Log In Bot
client.login(token);
