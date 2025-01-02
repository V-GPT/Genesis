const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { createErrorEmbed } = require("../../util/Embeds");

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

    if (min <= max) {
      const randomNum = Math.round(Math.random() * (max - min)) + min;
      const embed = new EmbedBuilder().setTitle(
        `Your random number from ${min} to ${max} is ${randomNum}!`,
      );
      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = createErrorEmbed("Minimum should be greater than maximum.");
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
