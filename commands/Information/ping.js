const Discord = require('discord.js');
const colors = require('../../colors.json');
const ws = require('ws');

module.exports = {
    name: 'ping',
    category: 'Information',
    description: 'Returns bot and API latency in milliseconds',
    usage: `ping`,
    run: async (bot, message, args) => {
        const msg = await message.channel.send('🏓 Pinging...').then(m => m.delete({timeout: 100}));
        
        const embed = new Discord.MessageEmbed()
        .setColor(colors.pink)
        .setTitle("🏓 Pong!")
        .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(bot.ws.ping)} ms**`);

        message.channel.send(embed);
        message.delete();
    }
}