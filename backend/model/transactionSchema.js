const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Transaction = new Schema({
	id: ObjectId,
	tx_id: String,
	tx_status: String,
	tx_type: String,
	fee_rate: Number,
	sender_address: String,
	post_condition_mode: String,
	block_hash: String,
	block_height: Number,
	tx_result: Object,
});

module.exports = Transaction;