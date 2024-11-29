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
    const subcommand = interaction.options.getSubcommand();
    const validateBinary = (number) => /^[01]+$/.test(number.toString());

    if (subcommand === "encode") {
      const integer = interaction.options.getInteger("number");
      const binary = integer.toString(2);

      const embed = new EmbedBuilder()
        .addFields(
          { name: "Expression", value: `${integer}`, inline: true },
          { name: "Result", value: `${binary}`, inline: true }
        );

      return await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "decode") {
      const binary = interaction.options.getInteger("binary").toString();
      if (!validateBinary(binary)) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000") 
          .addFields({ name: "Error", value: "Input must be a valid binary number." });

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }
      const integer = parseInt(binary, 2);

      const embed = new EmbedBuilder()
        .addFields(
          { name: "Expression", value: `${binary}`, inline: true },
          { name: "Result", value: `${integer}`, inline: true }
        );

      return await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "add") {
      const first = interaction.options.getInteger("first").toString();
      const second = interaction.options.getInteger("second").toString();

      if (!validateBinary(first) || !validateBinary(second)) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000") 
          .addFields({ name: "Error", value: "Both inputs must be valid binary numbers." });

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const sum = parseInt(first, 2) + parseInt(second, 2);
      const binarySum = sum.toString(2);

      const embed = new EmbedBuilder()
        .addFields(
          { name: "Expression", value: `${first} + ${second}`, inline: true },
          { name: "Result", value: `${binarySum}`, inline: true }
        );

      return await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "subtract") {
      const first = interaction.options.getInteger("first").toString();
      const second = interaction.options.getInteger("second").toString();

      if (!validateBinary(first) || !validateBinary(second)) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000") 
          .addFields({ name: "Error", value: "Both inputs must be valid binary numbers." });

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const difference = parseInt(first, 2) - parseInt(second, 2);
      const binaryDifference = difference.toString(2);

      const embed = new EmbedBuilder()
        .addFields(
          { name: "Expression", value: `${first} - ${second}`, inline: true },
          { name: "Result", value: `${binaryDifference}`, inline: true }
        );

      return await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "multiply") {
      const first = interaction.options.getInteger("first").toString();
      const second = interaction.options.getInteger("second").toString();

      if (!validateBinary(first) || !validateBinary(second)) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000") 
          .addFields({ name: "Error", value: "Both inputs must be valid binary numbers." });

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const product = parseInt(first, 2) * parseInt(second, 2);
      const binaryProduct = product.toString(2);

      const embed = new EmbedBuilder()
        .addFields(
          { name: "Expression", value: `${first} * ${second}`, inline: true },
          { name: "Result", value: `${binaryProduct}`, inline: true }
        );

      return await interaction.reply({ embeds: [embed] });

    } else if (subcommand === "divide") {
      const first = interaction.options.getInteger("first").toString();
      const second = interaction.options.getInteger("second").toString();

      if (!validateBinary(first) || !validateBinary(second)) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000") 
          .addFields({ name: "Error", value: "Both inputs must be valid binary numbers." });

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      if (parseInt(second, 2) === 0) {
        const embed = new EmbedBuilder()
          .setColor("#FF0000")  
          .addFields({ name: "Error", value: "Division by zero is not allowed." });

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const quotient = Math.floor(parseInt(first, 2) / parseInt(second, 2));
      const binaryQuotient = quotient.toString(2);

      const embed = new EmbedBuilder()
        .addFields(
          { name: "Expression", value: `${first} ÷ ${second}`, inline: true },
          { name: "Result", value: `${binaryQuotient}`, inline: true }
        );

      return await interaction.reply({ embeds: [embed] });
    }
  },
};
