const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary")
    .setDescription("A command with binary conversion and addition functionality")
    .addSubcommand(subcommand =>
      subcommand
        .setName("convert")
        .setDescription("Convert a number to binary")
        .addIntegerOption(option =>
          option
            .setName("number")
            .setDescription("Pick a number to convert into binary")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("add")
        .setDescription("Add two numbers")
        .addIntegerOption(option =>
          option
            .setName("first")
            .setDescription("The first number")
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName("second")
            .setDescription("The second number")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "convert") {
      const integer = interaction.options.getInteger("integer");
      const binary = integer.toString(2);

      const embed = new EmbedBuilder()
        .setTitle("Binary Converter")
        .addFields(
            {name: 'Number', value: `**${integer}**`, inline: true},
            {name: 'Binary', value: `**${binary}**`, inline: true},
        )
        .setColor("BLUE");

      await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "add") {
      const first = interaction.options.getInteger("first");
      const second = interaction.options.getInteger("second");
      const sum = first + second;
      const binarySum = sum.toString(2);

      const embed = new EmbedBuilder()
        .setTitle("Addition Result")
        .addFields(
            {name: 'First', value: `**${first}**`, inline: true},
            {name: 'Second', value: `**${second}**`, inline: true},
            {name: 'Sum', value: `**${binarySum}**`, inline: true},
        )
        .setColor("GREEN");

      await interaction.reply({ embeds: [embed] });
    }
  },
};
