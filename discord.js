const {
  Client,
  Collection,
  GatewayIntentBits,
  DMChannel,
} = require("discord.js");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("express"));
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).send({ success: true, message: "Aktif!" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Bir hata olustu." });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
// Import Utils
const createEmbed = require("./utils/createEmbed.js");

// Import Config
const { API_KEY, API_SECRET, BASE_URL, TOKEN } = require("./config.json");

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["binance-api-key"] = API_KEY;
axios.defaults.headers.common["binance-api-secret"] = API_SECRET;
axios.defaults.headers.common["Content-Type"] = "application/json";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const m1Channel = new DMChannel(client, {
  id: "1069671646794891324",
  name: "m1",
});

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

// Login to Discord with your client's token
client.login(TOKEN);

