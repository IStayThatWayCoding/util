// const Guild = require("../../models/guild");
// const WELCOME = require('../../models/welcome-schema');

// module.exports = {
//     name: 'setup',
//     category: 'Moderation',
//     description: 'Helps setup the bot for the server needs.',
//     usage: `setup`,
//     run: async (bot, message, args) => {
        
//         const guildDB = await Guild.findOne({
//             guildID: message.guild.id
//         }, async (err, guild) => {
//             if (err) console.error(err);
            
//             if (!guild) {
//                 const newGuild = new Guild({
//                     _id: mongoose.Types.ObjectId(),
//                     guildID: message.guild.id,
//                     guildName: message.guild.name,
//                     prefix: process.env.PREFIX,
//                     logChannelID: null,
//                     welcomeLogs: null,
//                     mutedRole: null,
//                     memberRole: null
//                 });
    
//                 await newGuild.save()
//                 .then(result => console.log(result))
//                 .catch(err => console.error(err));
//             };
//         })

//         if(guildDB.logChannelID === null){
//             message.channel.send(`❌- Please set your MODLOG channel using \`${guildDB.prefix}modlog\``)
//         } else {
//             message.channel.send(`✅ - Your log channel is set! To change it, use \`${guildDB.prefix}modlog\`.`)
//         }

//         if(guildDB.welcomeLogs === null){
//             message.channel.send(`❌ - Please set your WELCOME-LOGS channel using \`${guildDB.prefix}welcomelogs\`. **[OPTIONAL]**`)
//         } else {
//             message.channel.send(`✅ - Your welcome logs channel is set! To change this, use \`${guildDB.prefix}welcomelogs\`. To remove this, simply delete the channel.`)
//         }

//         if(WELCOME.channelID === null){
//             message.channel.send(`❌ - Please set your welcome channel using \`${guildDB.prefix}setwelcome\`. **[OPTIONAL]**`)
//         } else {
//             message.channel.send(`✅ - Your welcome channel is set! To change this, use \`${guildDB.prefix}setwelcome\`. To remove this, simply delete the channel.`)
//         }

//         if(!guildDB.mutedRole === null){
//             message.channel.send(`❌ - Please set your MUTED ROLE using \`${guildDB.prefix}mutedrole\`.`)
//         } else {
//             message.channel.send(`✅ - Your muted role is set! To change this, run the \`${guildDB.prefix}mutedrole\` command.`)
//         }

//         if(!guildDB.memberRole === null){
//             message.channel.send(`❌ - Your member role isn't set! The member role is used when someone gets muted it takes the role away until unmute. To use this function, run the \`${guildDB.prefix}memberrole\` command. **[OPTIONAL]**`)
//         } else {
//             message.channel.send(`✅ - Your member role is set! To change this, run the \`${guildDB.prefix}memberrole\` command.`)
//         }
//     }

    


// }