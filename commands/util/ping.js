const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command that replies with Pong!"),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder().setTitle("🏓 Pong!");

    interaction.reply({ embeds: [exampleEmbed] });
  },
};
