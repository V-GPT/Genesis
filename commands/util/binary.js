const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary")
    .setDescription("Binary and Decimal Conversions")
    .addSubcommand(subcommand =>
      subcommand
        .setName("encode")
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
        .setName("decode")
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
        .setDescription("Add two binary numbers")
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
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("subtract")
        .setDescription("Subtract two binary numbers")
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
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("multiply")
        .setDescription("Multiply two binary numbers")
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
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("divide")
        .setDescription("Divide two binary numbers")
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
    try {
      const subcommand = interaction.options.getSubcommand();

      const validateBinary = (number) => /^[01]+$/.test(number.toString());

      if (subcommand === "encode") {
        const integer = interaction.options.getInteger("number");
        const binary = integer.toString(2);

        const embed = new EmbedBuilder()
          .addFields(
            { name: "Number", value: `**${integer}**`, inline: true },
            { name: "Binary", value: `**${binary}**`, inline: true }
          );

        await interaction.reply({ embeds: [embed] });

      } else if (subcommand === "decode") {
        const binary = interaction.options.getInteger("binary").toString();
        if (!validateBinary(binary)) {
          throw new Error("Input must be a valid binary number.");
        }
        const integer = parseInt(binary, 2);

        const embed = new EmbedBuilder()
          .addFields(
            { name: "Binary", value: `**${binary}**`, inline: true },
            { name: "Number", value: `**${integer}**`, inline: true }
          );

        await interaction.reply({ embeds: [embed] });

      } else if (subcommand === "add") {
        const first = interaction.options.getInteger("first").toString();
        const second = interaction.options.getInteger("second").toString();

        if (!validateBinary(first) || !validateBinary(second)) {
          throw new Error("Both inputs must be valid binary numbers.");
        }

        const sum = parseInt(first, 2) + parseInt(second, 2);
        const binarySum = sum.toString(2);

        const embed = new EmbedBuilder()
          .addFields(
            { name: "First + Second", value: `First: **${first}** + Second: **${second}**`, inline: true },
            { name: "Sum", value: `**${binarySum}**`, inline: true }
          );

        await interaction.reply({ embeds: [embed] });

      } else if (subcommand === "subtract") {
        const first = interaction.options.getInteger("first").toString();
        const second = interaction.options.getInteger("second").toString();

        if (!validateBinary(first) || !validateBinary(second)) {
          throw new Error("Both inputs must be valid binary numbers.");
        }

        const difference = parseInt(first, 2) - parseInt(second, 2);
        const binaryDifference = difference.toString(2);

        const embed = new EmbedBuilder()
          .addFields(
            { name: "First - Second", value: `First: **${first}** - Second: **${second}**`, inline: true },
            { name: "Difference", value: `**${binaryDifference}**`, inline: true }
          );

        await interaction.reply({ embeds: [embed] });

      } else if (subcommand === "multiply") {
        const first = interaction.options.getInteger("first").toString();
        const second = interaction.options.getInteger("second").toString();

        if (!validateBinary(first) || !validateBinary(second)) {
          throw new Error("Both inputs must be valid binary numbers.");
        }

        const product = parseInt(first, 2) * parseInt(second, 2);
        const binaryProduct = product.toString(2);

        const embed = new EmbedBuilder()
          .addFields(
            { name: "First * Second", value: `First: **${first}** * Second: **${second}**`, inline: true },
            { name: "Product", value: `**${binaryProduct}**`, inline: true }
          );

        await interaction.reply({ embeds: [embed] });

      } else if (subcommand === "divide") {
        const first = interaction.options.getInteger("first").toString();
        const second = interaction.options.getInteger("second").toString();

        if (!validateBinary(first) || !validateBinary(second)) {
          throw new Error("Both inputs must be valid binary numbers.");
        }

        if (parseInt(second, 2) === 0) {
          throw new Error("Division by zero is not allowed.");
        }

        const quotient = Math.floor(parseInt(first, 2) / parseInt(second, 2));
        const binaryQuotient = quotient.toString(2);

        const embed = new EmbedBuilder()
          .addFields(
            { name: "First / Second", value: `First: **${first}** ÷ Second: **${second}**`, inline: true },
            { name: "Quotient", value: `**${binaryQuotient}**`, inline: true }
          );

        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      await interaction.reply({ content: `An error occurred: ${error.message}`, ephemeral: true });
    }
  },
};
