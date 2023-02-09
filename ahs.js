const {

  DMChannel,
} = require("discord.js");
const m1Channel = new DMChannel(client, {
  id: "1073265828235059240",
  name: "mazlum-dev",
});

async function ahs() {
  console.log("AHS Bot")
  await m1Channel.send({
    embeds: [embed],
  });
}

module.exports = {
  ahs,
};
