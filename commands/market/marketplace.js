const { MessageEmbed } = require('discord.js');
const collection = require('../../collectionConfig.json');

module.exports = {
	name: 'marketplace',
	aliases: ['market', 'byz', 'byznation', 'stxnft'],
	description: 'Get links to the collection page at top marketplaces',
	usage: 'marketplace',
	category: 'market',
	args: false,

	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Marketplace')
			.addFields(
				{
					name: 'STXNFT',
					value: `View at stxnft.com: \n ${collection.marketplaceWebsite.stxnft}`,
				},
				{
					name: 'BYZANTION',
					value: `View at byzantion.xyz: \n ${collection.marketplaceWebsite.byzantion}`,
				},
			)
			.setImage(`${collection.collectionBanner}`)
			.setTimestamp();
		// Send Message
		message.channel.send({ embeds: [embed] });
		// logging
		console.log(embed);
		if (module.exports.args === false) {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name}`);
		}
		else {
			console.log(`${message.author.tag} used the ${module.name} command on ${message.guild.name} with the following arguments: ${message.content.slice(message.content.indexof(' ') + 1)}`);
		}
	},
};
