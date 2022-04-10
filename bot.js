// eslint-disable-next-line no-unused-vars
const env = require('dotenv').config();
const fs = require('fs');
// discord.js
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// Import: Token
const token = process.env.TOKEN;
// Import: Config
const config = require('./botConfig.json');
const guildID = config.discord.guildID;
const clientID = config.discord.clientID;
// Import: Utilities
const stacksIO = require('./util/stacksIO.js');
const getContractDetails = require('./util/stacksAPI/smartContracts/getContractInfo.js');


// Create Client
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
});

// Get Contract Details
getContractDetails()
	.then((results) => {
		console.log(`Contract Loaded: ${results.results.contract_id}`);
		return results;
	})
	.catch((err) => {
		console.log(err);
	});


// Event Handler
const eventFolders = fs.readdirSync('./events');
for (const folder of eventFolders) {
	const eventFiles = fs
		.readdirSync(`./events/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`./events/${folder}/${file}`);
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
console.log('Fetching commands...');
const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];
(async () => {
	try {
		console.log('Refreshing appl`ication (/) commands');
		await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{
				body: commandJsonData,
			},
		);
		console.log('Successfully refreshed application (/) commands');
	}
	catch (error) {
		console.error(error);
	}
})();

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

// Listen for new blocks, microblocks, and transactions
stacksIO();

// Log In Bot
client.login(token);