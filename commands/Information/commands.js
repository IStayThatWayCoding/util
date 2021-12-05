const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const Guild = require('../../models/guild');
const colors = require('../../colors.json');

module.exports = {
    name: 'commands',
    aliases: ['c'],
    category: 'Information',
    description: 'Displays a full list of bot commands.',
    usage: `commands`,
    run: async (bot, message) => {
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

        return getAll(bot, message);
    }
}

async function getAll(bot, message) {
    const guildDB = await Guild.findOne({
        guildID: message.guild.id
    });

    const embed = new MessageEmbed()
    .setColor(colors.gold)
    .setTitle('Command List')
    .setThumbnail(bot.user.avatarURL())
    .setFooter(process.env.FOOTER)
    
    const commands = (category) => {
        return bot.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${(guildDB.prefix) + cmd.name}\``)
            .join('\n');
    }

    const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => `${string}\n\n${category}`);


    return message.channel.send(embed.setDescription('Use `' + (`${guildDB.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${info}`)));
}