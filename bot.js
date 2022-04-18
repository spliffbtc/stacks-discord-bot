const mongoose = require('mongoose');

const models = require('./backend/models');
const startBot = require('./bot/bot');

// Start Bot
try {
	startBot();
}
catch (err) {
	console.log(err);
}

// Start Database