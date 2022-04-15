// Environment
// eslint-disable-next-line no-unused-vars
const env = require('dotenv').config();
// File System
const fs = require('fs');
// Logging
const winston = require('winston');
// Discord
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// Discord: Bot Token
const token = process.env.TOKEN;
// Import: Config
const config = require('./botConfig.json');
const guildID = config.guildID;
const clientID = config.clientID;
// Import: Utilities
const stacksIO = require('./util/stacksIO.js');
const getContractDetails = require('./util/stacksAPI/smartContracts/get-contract-info.js');

// Logging
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json(),
		winston.format.prettyPrint(),
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		//
		// - Write all logs with importance level of `error` or less to `error.log`
		// - Write all logs with importance level of `info` or less to `combined.log`
		//
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}

// Create Client
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
});

// Get Contract Details
// Currently not doing much for bot;
// eventually should be used instead of botConfig.json;
getContractDetails()
	.then((results) => {
		logger.info(`Contract Loaded: ${results.results.contract_id}`);
		return results;
	})
	.catch((error) => {
		console.error(error);
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
			client.once(event.name, (...args) => event.execute(...args, client, logger));
		}
		else {
			client.on(
				event.name,
				async (...args) => await event.execute(...args, client, logger),
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

// Register Commands: Standard Commands
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
		console.log('Refreshing application (/) commands');
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
stacksIO(logger, client);

// Log In Bot
client.login(token);