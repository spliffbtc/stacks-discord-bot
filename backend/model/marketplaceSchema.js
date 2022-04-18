const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Marketplace = new Schema({
	id: ObjectId,
	marketplace_name: String,
	marketplace_url: String,
	marketplace_logo: String,
	marketplace_description: String,
	marketplace_category: String,
	marketplace_subcategory: String,
	marketplace_tags: String,
});

module.exports = Marketplace;