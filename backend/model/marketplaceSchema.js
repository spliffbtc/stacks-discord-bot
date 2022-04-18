const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Marketplace = new Schema({
	id: ObjectId,
});

module.exports = Marketplace;