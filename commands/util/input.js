const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('input')
        .setDescription('you can pick a number between 1 and 6')
        .addIntegerOption(option => {
            option
            .setName("integer")
            .setDescription("some name i guess")
            .setMinValue(1)
            .setMaxValue(6)
        }),
    
    async execute(interaction) {
        const userInput = interaction.options.getInteger('integer');
        await interaction.reply(`You picked ${userInput}!`);
    },    
};