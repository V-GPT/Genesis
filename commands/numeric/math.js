const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { evaluate } = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("math")
    .setDescription("Evaluates mathematical expressions")
    .addStringOption((option) =>
      option
        .setName("expression")
        .setDescription("Expression to be evaluated")
        .setRequired(true),
    ),
  async execute(interaction) {
    const expression = interaction.options.getString("expression");

    try {
      const result = evaluate(expression);
      const embed = new EmbedBuilder().addFields(
        { name: "Expression", value: `\`${expression}\`` },
        { name: "Result", value: `\`${result}\`` },
      );
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder().setTitle(
        `❌\tInput: \`${expression}\` is not a valid expression.`,
      );
      await interaction.reply({ embeds: [embed] });
    }
  },
};
