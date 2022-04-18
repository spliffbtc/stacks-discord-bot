const axios = require('axios');
const fs = require('fs');

module.exports = async (imageURL) => {
	try {
		// Currently Doing Nothing
		const resizedURL = imageURL;
		return resizedURL;
	}
	catch (error) {
		console.log(error);
		return imageURL;
	}
};