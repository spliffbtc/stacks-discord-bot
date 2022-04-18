const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bot = new Schema({
	id: ObjectId,
	guildID: String,
	ownerID: String,
	botID: String,
	botSettings: {
		botOn: Boolean,
		commandPrefix: String,
		defaultChannelID: String,
	},
});

module.exports = Bot;