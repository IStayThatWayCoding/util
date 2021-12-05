module.exports = {
    name: 'reload',
    aliases: ['r'],
    category: 'Owner',
    description: 'CAN ONLY BE USED BY OWNER: reloads a command',
    usage: `reload`,
    run: async (bot, message, args) => {
        const allowed = [
            "274021702411747328",
            "832122159333376062"
            
        ]
        if(!allowed.includes(message.author.id)) return message.channel.send("You must be the bot owner to use this command.")

        if(!args[0]) return message.channel.send("Please specify a command to reload.")

        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)] //!reload <name>
            bot.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            bot.commands.set(commandName, pull)
        } catch (e) {
            return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\`.`)
        }

        message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded. The code is either not changed or there is an error.`)
    }
}