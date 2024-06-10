const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
require('dotenv').config()
client.config = config;

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`👌 Command loaded: ${commandName}`);
    });
});

// Choose a port to listen on (process.env.PORT for Heroku, or a default port)
const PORT = process.env.PORT || 3000;

// Login through the client
client.login(process.env.TOKEN)
    .then(() => {
        console.log('Discord Bot logged in successfully!');
        console.log(`Web server running on port ${PORT}`);
    })
    .catch((error) => {
        console.error('Error logging in Discord Bot:', error);
    });

// Keep the bot alive by creating a simple HTTP server
const http = require('http');
const server = http.createServer((_req, res) => {
    res.writeHead(200);
    res.end('Bot is running!');
});

server.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
});
