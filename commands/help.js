const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setTitle("Command List & Guide for the Bot")
      .setDescription("Below are Commands you can do with Bot, Right now there is only 6 commands available, more commands will be added soon.")
      .addField("🎁 Giveaway 🎁","~start [channel-name] [Time] [winners] [Prize]\n~reroll [prize name]\n~end [prize name]")
      .addField("Examples", "~start #giveaway 5m 1 Testing\n~end Testing\n~reroll Testing")
      .addField("Utility", "ping, invite, rd", true)
      .addField("ℹ Information ℹ", "stats", true)
      .addField("Check out", " Join [This Server](https://discord.gg/p8Ctsm4z6R) for further support\n</help:1245730761739604049> to get more commands")
      .setTimestamp()
      .setFooter(`Requested By ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**Sent the commands in Direct Messages! 💌, Check DMs**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
