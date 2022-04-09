const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

module.exports = async (url) => {
	const imageResponse = await axios({ url: url, responseType: 'arraybuffer' });
	const buffer = Buffer.from(imageResponse.data, 'binary');
	const src = new sharp(buffer);
	try {
		await src.jpeg();
		await src.resize(null, 1920);
		await src.resize(1080, null);
		await src.toFormat('png');
		await src.toFile('temp.png');
		const resizedImage = await fs.realpathSync('temp.png');
		return resizedImage;
	}
	catch (error) {
		console.log(error);
	}
};