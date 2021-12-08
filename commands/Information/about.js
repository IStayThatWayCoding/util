const Discord = require('discord.js');
const colors = require('../../colors.json');


module.exports = {
    name: 'about',
    aliases: ['aboutme', 'a'],
    category: 'Information',
    description: 'Gives information about the bot!',
    usage: `about`,
    run: async (bot, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor(colors.pink)
        .setTitle("About The Bot")
        .setThumbnail(bot.user.avatarURL())
        .setDescription(`Hi! I am **${bot.user.username}**! \n\nI was developed by: **istay#5154** (Creator & Developer) and **zack;#0997** (Developer)! \n\nStill a work in progress.\n\nJoin the support server [here](https://www.dsc.gg/util-support)`);

        message.channel.send(embed);
    }
}
