const ms = require('ms');
const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'uptime',
    aliases: ['u'],
    category: 'Owner',
    description: 'Gives a description on the uptime of the bot',
    usage: `uptime`,
    run: async (bot, message, args) => {
        const allowed = [
            "274021702411747328",
            "832122159333376062"
            
        ]
        if(!allowed.includes(message.author.id)) return message.channel.send("You must be the bot owner to use this command.")

        let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const embed = new Discord.MessageEmbed()
    .setTitle("Bot Uptime")
    .setColor(colors.gold)
    .addField("Days", days)
    .addField("Hours", hours)
    .addField("Minutes", minutes)
    .addField("Seconds", seconds)
    .setFooter(process.env.FOOTER);
 

    message.channel.send(embed);

        
        
    }
}