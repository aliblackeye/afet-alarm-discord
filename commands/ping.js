const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Bot'un pingini gösterir."),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Ölçülüyor...",
      fetchReply: true,
    });
    interaction.editReply(
      `Ping: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms`
    );
  },
  
};
