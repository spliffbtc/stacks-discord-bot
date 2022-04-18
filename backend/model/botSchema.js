const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bot = new Schema({
	id: ObjectId,
	guild_id: String,
	owner_id: String,
	bot_id: String,
	settings: {
		bot_on: Boolean,
		command_prefix: String,
		channels: {
			default_channel_id: String,
			welcome_channel_id: String,
			events_channel_id: String,
		},
	},
});

module.exports = Bot;