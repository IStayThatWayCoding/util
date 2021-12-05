const WelcomeSchema = require("../models/welcome-schema")
const Discord = require('discord.js')
const Guild = require("../models/guild");
const moment = require('moment')

module.exports = async (bot, member, guild, args) => {

     WelcomeSchema.findOne({ guildID: member.guild.id }, async (err, data) => {
         if (!data) return;

        const user = member.user;
        const channel = member.guild.channels.cache.get(data.channelID);
   
           let WelcomeEmbed = new Discord.MessageEmbed()
           .setTitle(member.guild.name)
           .setDescription(`Welcome <@${user.id}> to ${member.guild.name}!\nMake sure to read our server rules.\nLatest Member Count: ${member.guild.memberCount}`)
           .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({dynamic: true, size: 512}))
           .setColor('RANDOM')
           .setTimestamp()

           channel.send(WelcomeEmbed)
   
           const guildDB = await Guild.findOne({
            guildID: member.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    guildName: member.guild.name,
                    prefix: process.env.PREFIX,
                    welcomeLogs: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = member.guild.channels.cache.get(guildDB.logChannelID);

        let WelcomeLogEmbed = new Discord.MessageEmbed()
        .setTitle(member.guild.name)
        .setDescription(`Latest information about the member that joined!`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .addFields(
            {name: 'User Tag', value: `${member}`, inline: true},
            {name: 'Discriminator', value: `${member.user.discriminator}`, inline: true},
            {name: 'Bot', value: `${member.user.bot}`},
            {name: 'Presence', value: `${member.user.presence.status}`, inline: true},
            {name: 'Joined Server At', value: `${moment(member.joinedAt).format('MM/DD/YYYY')}`, inline: true},
            {name: 'Joined Discord At', value: `${moment(member.user.createdAt).format('MM/DD/YYYY')}`, inline: true},
        )
        .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor('RANDOM')
        .setTimestamp()

        logChannel.send(WelcomeLogEmbed);

    });
};