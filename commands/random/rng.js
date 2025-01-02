const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rng")
    .setDescription(
      "Generates a random integer between min and max (inclusive)!",
    )
    .addIntegerOption((option) =>
      option.setName("min").setDescription("minimum value").setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName("max").setDescription("maximum value").setRequired(true),
    ),
  async execute(interaction) {
    const min = interaction.options.getInteger("min");
    const max = interaction.options.getInteger("max");

    if (min > max) {
      const embed = new EmbedBuilder().setTitle(`❌\tInvalid input: min > max`);
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const embed = new EmbedBuilder().setTitle(
      `Your random number from ${min} to ${max} is ${Math.round(Math.random() * (max - min)) + min}!`,
    );

    await interaction.reply({ embeds: [embed] });
  },
};
