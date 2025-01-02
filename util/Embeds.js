const { EmbedBuilder } = require("discord.js");

function createSuccessEmbed(message) {
  return new EmbedBuilder()
    .setColor("Green")
    .setDescription(`✅ - **${message}**`);
}

function createErrorEmbed(message) {
  return new EmbedBuilder()
    .setColor("Red")
    .setDescription(`❌ - **${message}**`);
}

module.exports = { createSuccessEmbed, createErrorEmbed };
