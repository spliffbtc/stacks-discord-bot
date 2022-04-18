const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Contract = new Schema({
	id: ObjectId,
	tx_id: String,
	contract_name: String,
	contract_address: String,
});

module.exports = Contract;