const { Client, DMChannel, Collection, GatewayIntentBits } = require("discord.js");
const cheerio = require('cheerio');
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("express"));
app.use(cors());



// Import Config
const { BASE_URL, TOKEN } = require("./config.json");

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Event Handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Command Handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
const channel = new DMChannel(client, {
  id: "1073265716221972561",
  name: "berkay-dev",
});
// Import Utils
const createEarthquake = require("./utils/createEmbed.js");

const url = "https://deprem.afad.gov.tr/last-earthquakes.html"

const buyuklukEsigi = 4.5;
let oncekiDepremTarihi = "";

async function ahs() {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const sonDeprem = $("tbody tr td");
  let tarih = sonDeprem.slice(0, 1).text();
  if (tarih != oncekiDepremTarihi) {
    oncekiDepremTarihi = tarih;
    let buyukluk = Number(sonDeprem.slice(4, 6).text().slice(2, 5));

    console.log(tarih)
    console.log(buyukluk)
    if (buyukluk >= buyuklukEsigi) {
      let derinlik = sonDeprem.slice(2, 4).text();
      let yer = sonDeprem.slice(5, 7).text();
      const embed = createEarthquake(tarih, derinlik, buyukluk, yer, url);
      await channel.send({
        //content: sonDeprem
        embeds: [embed]
      })
    }
  }

}

setInterval(() => {
  ahs();
}, 5 * 1000)



// Login to Discord with your client's token
client.login(TOKEN);

ahs();