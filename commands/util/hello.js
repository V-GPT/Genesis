const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('idk'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};