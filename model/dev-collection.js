const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = new Schema({
	collectionName: String,
	collectionWebsite: String,
	collectionBanner: String,
	marketplaceWebsite: {
		STXNFT: String,
		byzantion: String,
	},
	contractAddress: String,
	contractName: String,
	asset_identifier: String,
	nftPrefix: String,
	imageURL: String,
});

const model = mongoose.model('collection', collection);
module.exports = model;