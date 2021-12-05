module.exports = {
    name: 'purge',
    aliases: ['clear'],
    category: 'Moderation',
    description: 'Clears a specific amount of messages',
    usage: `purge`,
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from **1 - 100**')
        if(isNaN(args[0])) return message.channel.send('Please only use numbers.')
        if(parseInt(args[0]) > 100) return message.channel.send('The max amount of messages that I can delete is **100**')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send(`${args[0]}` + " messages have been deleted.")
    }
}