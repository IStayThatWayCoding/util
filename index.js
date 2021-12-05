const { config } = require('dotenv');
const { Client, Collection, Intents, DiscordAPIError, MessageEmbed} = require('discord.js');
const bot = new Client({ intents: ['GUILDS', 'GUILD_VOICE_STATES'] });
const fs = require('fs');
const mongoose = require('mongoose');
require('discord-buttons')(bot)


bot.categories = fs.readdirSync("./commands/");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.mongoose = require("./utils/mongoose");

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

config({
    path: `${__dirname}/.env`
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        bot.on(evtName, evt.bind(null, bot));
        console.log(`Loaded event '${evtName}'`);
        
    });
});

bot.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === 'text' &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")

        ) channelToSend = channel;
    });

    if(!channelToSend) return;

    let embed = new MessageEmbed()
    .setTitle("Thanks For Inviting Me!")
    .setColor("RANDOM")
    .setDescription("Hi! Thanks for inviting me to this server. Keep in mind that this bot **is still in development** so if you spot any issues, join my support server to report it. [Support Server](https://www.google.com)")
    channelToSend.send(embed);
})

bot.mongoose.init();
bot.login(process.env.TOKEN);