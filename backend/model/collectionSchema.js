const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Collection = new Schema({
	id: ObjectId,
});

module.exports = Collection;