const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    await interaction.reply(
      `This command was run by ${interaction.user.username}, to get server information:\nThe server name is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
    );
  },
};
