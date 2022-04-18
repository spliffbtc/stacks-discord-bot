const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Collection = new Schema({
	id: ObjectId,
	collection_name: String,
	collection_description: String,
	collection_tags: String,
	collection_logo: String,
	collection_url: String,
	collection_category: String,
	urls: {
		website: String,
		discord: String,
		twitter: String,
	},
});

module.exports = Collection;