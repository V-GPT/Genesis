const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Displays avatar/pfp of user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Mention user"),
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    const avatar = user.displayAvatarURL();
    const embed = new EmbedBuilder()
      .setTitle(`${user.username}`)
      .setImage(avatar);

    await interaction.reply({ embeds: [embed] });
  },
};
