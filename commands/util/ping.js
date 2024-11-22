const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command that replies with Pong!"),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder().setTitle("🏓 Pong!").addFields(
      {
        name: "Bot Latency",
        value: `${Date.now() - interaction.createdTimestamp}ms`,
      },
      {
        name: "API Latency",
        value: `${interaction.client.ws.ping}ms`,
      },
    );

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
