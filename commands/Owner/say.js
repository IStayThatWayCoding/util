const { MessageEmbed } = require('discord.js');
const colors = require("../../colors.json");
const settings = require("../Server Management/prefix");

module.exports = {
    name: 'say',
    category: 'Moderation',
    aliases: ['repeat'],
    description: 'Repeats input of the user',
    usage: `say [embed] <message>`,

    run: (bot, message, args) => {
        message.delete()

        const allowed = [
            "274021702411747328",
            "832122159333376062"
            
        ]
        if(!allowed.includes(message.author.id)) return message.channel.send("You must be the bot owner to use this command.")

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1)
            return message.channel.send('You must say saying to be repeated.').then(m => m.delete({timeout: 5000}));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor(colors.cyan)
                .setDescription(args.slice(1).join(' '))

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(' '));
        }
    }
}