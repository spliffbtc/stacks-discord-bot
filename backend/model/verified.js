const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Verified = new Schema({
	id: ObjectId,
	discordID: String,
	walletAddress: String,
	serverRole: String,
});

module.exports = Verified;