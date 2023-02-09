const { DMChannel,Client, GatewayIntentBits } = require("discord.js");

// Import Utils
const createEmbed = require("./utils/createEmbed.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const berkay_devChannel = new DMChannel(client, {
  id: "1073265716221972561",
  name: "berkay-dev",
});

async function ahs() {
  console.log("AHS Bot")
  //await berkay_devChannel.send({ embeds: [embed], });
  await berkay_devChannel.send({ content: 'This is an embed.', });
}

module.exports = {
  ahs,
};
