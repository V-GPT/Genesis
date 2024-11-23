const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary")
    .setDescription("Binary and Decimal Conversions")
    .addSubcommand(subcommand =>
      subcommand
        .setName("dec_to_bin")
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
          .setName("bin_to_dec")
          .setDescription("Convert a binary number to a decimal number")
          .addIntegerOption(option =>
            option
              .setName("binary")
              .setDescription("Pick a binary number to convert into decimals")
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

    if (subcommand === "dec_to_bin") {
      const integer = interaction.options.getInteger("number");
      const binary = integer.toString(2);
      const embed = new EmbedBuilder()
        .addFields(
            {name: 'Number', value: `**${integer}**`, inline: true},
            {name: 'Binary', value: `**${binary}**`, inline: true},
        )

      await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "bin_to_dec") {
        const binary = interaction.options.getInteger("binary");
        const integer = parseInt(`**${binary}**`, 2);
        const embed = new EmbedBuilder()
            .addFields(
                {name: 'Binary', value: `**${binary}**`, inline: true},
                {name: 'Number', value: `**${integer}**`, inline: true},
            )

      await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "add") {
        
        const first = interaction.options.getInteger("first");
        const second = interaction.options.getInteger("second");
        const sum = first + second;
        const binarySum = sum.toString(2);
  
        const embed = new EmbedBuilder()
            .addFields(
                {name: 'First', value: `**${first}**`, inline: true},
                {name: 'Second', value: `**${second}**`, inline: true},
                {name: 'Sum', value: `**${binarySum}**`, inline: true},
            )
  
        await interaction.reply({ embeds: [embed] });
    }
  },
};
