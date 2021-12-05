const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const Settings = require('../../models/settings');
const colors = require('../../colors.json');
const mutedRole = require('../Server Management/mutedRole');
const ms = require('ms');

module.exports = {
    name: 'tempmute',
    aliases: ['tempmutesilence', 'tm'],
    category: 'Moderation',
    description: 'Temporarily mutes a mentioned user. IMPORTANT: If you have a verified/member role that you want to remove from a user once you mute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.',
    usage: `tempmute`,
    run: async (bot, message, args) => {

        

        message.delete();
        message.channel.send("IMPORTANT: If you have a verified/member role that you want to remove from a user once you mute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.")
        const member = message.mentions.members.first();

        const guild = await Settings.findOne({
            guildID: message.guild.id
        }, async (err, settings) => {
            if (err) console.error(err);
            if(!settings) {
                const newSettings = new Settings({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name
                })

                newSettings.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        });

        const channel = guildDB.logChannelID;

        



        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`.')

        if(!member) return message.channel.send("User not specified. Please mention a member in this server, followed by the command.")

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
        })

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);
            if(!user) {
                const newUser = new User ({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: memberid,
                    muteCount: 0,
                    warnCount: 0,
                    kickCount: 0,
                    banCount: 0,
                    tempMuteCount: 1
                })

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                    tempMuteCount: user.tempMuteCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        })
        let MUTE_ROLE = guildDB.mutedRole
        let MEMBER_ROLE = guildDB.memberRole

        let time = args[1];
        if(!time){
            return message.channel.send("Pleae provide a valid time. For example: 5m or 5d.");
        }

        setTimeout( function () {
            member.roles.add(MEMBER_ROLE)
            member.roles.remove(MUTE_ROLE);
            message.channel.send(`${member} has been unmuted.`)
        }, ms(time));

        if(args.length < 2) {
            member.roles.add(MUTE_ROLE);
            member.roles.remove(MEMBER_ROLE)
            member.send(`🔇 You have been muted in ${message.guild.name}** \n**Reason:** No reason specified\n**Duration:** ${ms(ms(time))}`);
            message.channel.send(`${member} was **muted** for ${ms(ms(time))}`);
            if(!channel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor(colors.aqua)
                    .setTitle('Muted')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Username', `${member.user.username}`)
                    .addField('User ID', `${member.id}`)
                    .addField('Muted by:' `${(message.author)}`)
                    .addField('Reason', `No reason specified.`);

                    return client.channels.cache.get(guild.logChannelID).send(embed);
            
        }

            } else {
                    member.roles.add(MUTE_ROLE);
                    member.roles.remove(MEMBER_ROLE);
                    member.send(`🔇 You have been muted in ${message.guild.name}** \n**Reason:** ${(args.slice(1).join(' '))}\n**Duration:** ${ms(ms(time))}`);
                    message.channel.send(`${member} was **muted** for ${ms(ms(time))}`);
                    if(!channel) {
                        return
                    } else {
                        const embed = new MessageEmbed()
                            .setColor(colors.aqua)
                            .setTitle('Muted')
                            .setThumbnail(member.user.avatarURL())
                            .addField('Username', `${member.user.username}`)
                            .addField('User ID', `${member.id}`)
                            .addField('Muted by:' `${(message.author)}`)
                            .addField('Reason', (args.slice(1).join(' ')));

                            return client.channels.cache.get(guild.logChannelID).send(embed);




            }
        }

        }

}
