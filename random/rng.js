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
    const randomNum = Math.round(Math.random() * (max - min)) + min;

    const embed =
      min <= max
        ? new EmbedBuilder().setTitle(
            `Your random number from ${min} to ${max} is ${randomNum}!`,
          )
        : new EmbedBuilder().setTitle(`❌\tInvalid input: min > max`);
    await interaction.reply({ embeds: [embed] });
  },
};
