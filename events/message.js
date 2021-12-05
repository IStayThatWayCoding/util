const Discord = require('discord.js')
const mongoose = require('mongoose');
const Guild = require('../models/guild');
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    }, async (err, guild) => {
        if (err) console.error(err);
        
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: process.env.PREFIX,
                logChannelID: null,
                welcomeLogs: null
            });

            await newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        };
    })


    bot.on('clickButton', async (button) => {
        if(button.id === "btn1"){
            await button.reply.defer()
            await button.message.channel.send("hi.")
        }
    })


    let prefix = guildDB.prefix;

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    
    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command)
        command.run(bot, message, args);

    };