const {
  SlashCommandBuilder,
  SlashCommandIntegerOption,
} = require("discord.js");
const amount = new SlashCommandIntegerOption().setDescription("Mesaj sayısı").setMinValue(1).setMaxValue(1000).setName("amount").setRequired(true);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")

    .setDescription("Mesajları siler.")
    .addIntegerOption(amount),
  async execute(interaction) {

    console.log(amount);
    // if (!args[0])
    //   return interaction.reply("Lütfen silinecek mesaj sayısını giriniz.");
    // if (isNaN(args[0])) return interaction.reply("Lütfen bir sayı giriniz.");

    // if (args[0] > 100)
    //   return interaction.reply("Lütfen 100'den az bir sayı giriniz.");
    // if (args[0] < 1)
    //   return interaction.reply("Lütfen 1'den fazla bir sayı giriniz.");

    // await interaction.channel.messages
    //   .fetch({ limit: args[0] })
    //   .then((interactions) => {
    //     interaction.channel.bulkDelete(interactions);
    //   });

    // message.channel.send(`Başarıyla ${args[0]} mesaj silindi.`);
  },
};
