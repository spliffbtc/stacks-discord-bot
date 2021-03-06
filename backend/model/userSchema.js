const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
	id: ObjectId,
	discord_id: String,
	wallet_address: String,
	server_role: String,
});

module.exports = User;