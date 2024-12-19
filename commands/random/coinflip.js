const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin!"),
  async execute(interaction) {
    const randomNum = Math.round(Math.random());
    const headsOrTails = randomNum == 0 ? "Heads!" : "Tails!";
    const fileName = randomNum == 0 ? "Heads.png" : "Tails.png";
    const file = new AttachmentBuilder(`./images/${fileName}`);

    const embed = new EmbedBuilder()
      .setTitle(`${headsOrTails}`)
      .setImage(`attachment://${fileName}`);
    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
