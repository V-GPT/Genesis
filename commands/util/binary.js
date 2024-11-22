const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary")
    .setDescription("Convert numbers into binary")
    .addIntegerOption(option =>
        option
            .setName('integer')
            .setDescription('Pick a number')
            .setRequired(true)
    ),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Binary Converter")
      .setDescription(`The binary representation of **${integer}** is **${binary}**.`)

    const integer = interaction.options.getInteger('integer')
    const binary = integer.toString(2);
    
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
