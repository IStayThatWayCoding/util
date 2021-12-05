const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const Settings = require('../../models/settings');
const colors = require('../../colors.json');
const user = require('../../models/settings');

module.exports = {
    name: 'mute',
    aliases: ['silence', 'm'],
    category: 'Moderation',
    description: 'Mutes a mentioned user. IMPORTANT: If you have a verified/member role that you want to remove from a user once you mute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.',
    usage: `pmute`,
    run: async (bot, message, args) => {
        message.delete();

        

        // if(!mutedRole) return message.channel.send("In order to continue, run the `muterole` command. It is also encouraged to set a member role for the bot to remove upon mute and give upon unmute. This is the `memberrole` command, this is optional. ")



        const member = message.mentions.members.first();



        const guild = await Settings.findOne({
            guildID: message.guild.id
        }, async (err, settings) => {
            if (err) console.error(err);
            if (!settings) {
                const newSettings = new Settings({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    mutedRole: null,
                    memberRole: null
                })

                newSettings.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

            }
        });

        const channel = guild.logChannelID;
        
        


        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`');

        if(!member) return message.channel.send('Please mention a user in the server.').then(m => m.delete({timeout: 10000}));

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);
            if (!user) {
                const newUser = new User ({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 1,
                    warnCount: 0,
                    kickCount: 0,
                    banCount: 0
                })

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                 muteCount: user.muteCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        })


       let reason = args[2];
       if(!reason){
           reason = 'No reason specified'
       }

       let mutedRole = guild.mutedRole;
       let memberRole = guild.memberRole

       member.roles.add(mutedRole)
       member.roles.remove(memberRole)
       member.send(`[⚠] - You have been \`warned\` in **${message.guild.name}**. \n**Reason**" ${reason}`);
       message.channel.send(`${member} was **muted**!`)
       if(!channel) {
           return;
       } else {
           const embed = new Discord.MessageEmbed()
           .setColor(colors.blue_dark)
           .setTitle("Muted")
           .setThumbnail(member.user.avatarURL())
           .addField('Username', member.user.username)
           .addField('User ID', member.id)
           .addField('Moderator', `${(message.author)}`)
           .addField('Reason', reason);

           return channel.send(embed);


       }
        }

    }
