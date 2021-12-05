const Discord = require('discord.js');
const mongoose = require('mongoose')
const Schema = require('../../models/welcome-schema');

module.exports = {
    name: 'set-welcome-channel',
    category: 'Server Management',
    aliases: ['setwelcome', 'set-welcome', 'setwc', 'swc'],
    description: 'Sets the channel that welcome logs will be logged in.',
    usage: `setwelcome <#channel>`,

    run: async (bot, message, args) => {
        
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You are lacking the permission `MANAGE_GUILD`")

        const channel = message.mentions.channels.first()
        if (!channel) return message.channel.send("Channel not specified. Please specify a channel, followed by the command.")

        Schema.findOne({ guildID: message.guild.id }, async (err, data) => {
            if (data) {
                data.channelID = channel.id;
                data.save();
            } else {
                new Schema({
                    guildID: message.guild.id,
                    channelID: channel.id,
                }).save();
            }
            message.channel.send(`Successfully set the welcome channel to: ${channel}`)
        })
    }
}
