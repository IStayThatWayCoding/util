const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const colors = require('../../colors.json');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Information',
    description: 'Displays bot help message.',
    usage: `help [commandName]`,
    run: async (bot, message, args) => {
        await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });
    
                newGuild.save()
                .then(result => console.log(result))
                .then(message.channel.send("Since this is the first time, I've just added this server to my database! If the command didn't work, please run that command again."))
                .catch(err => console.error(err));
            }
        });

        if (args[0]) {
            return getCMD(bot, message, args[0]);
        } else {
            return helpMSG(bot, message);
        }
    }
}

async function helpMSG(bot, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new MessageEmbed()
        .setColor(colors.cream)
        .setTitle(`${bot.user.username} - Help`)
        .setThumbnail(bot.user.avatarURL())
        .setDescription(`Server Prefix: \`${guildDB.prefix}\`\n\nFor a full list of commands, please type \`${guildDB.prefix}commands\` \n\nTo see more info about a specific command, please type \`${guildDB.prefix}help <command>\` without the \`<>\``)
        .setFooter(process.env.FOOTER);
    message.channel.send(embed);
}

async function getCMD(bot, message, input) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new MessageEmbed()

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("#FFFFFF").setDescription(info));
    }

    if (cmd.name) info = `**Command Name**: ${cmd.name}`
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${guildDB.prefix}${cmd.usage}`;
        embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
    }
    if (cmd.usage2) info += `\n**Usage 2**: ${guildDB.prefix}${cmd.usage2}`;

    return message.channel.send(embed.setColor(colors.purple_light).setDescription(info));
}